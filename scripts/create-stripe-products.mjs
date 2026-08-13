import { readFileSync, writeFileSync } from "node:fs";
import Stripe from "stripe";

function loadEnv(path) {
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    let val = trimmed.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

loadEnv(".env.local");

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY in .env.local");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const catalog = [
  {
    tier: "sedan",
    name: "Sedan / Coupe",
    description: "Daily drivers & compact cars. Full interior & exterior driveway clean.",
    biweeklyCents: 5000,
    oneTimeCents: 7500,
    envBiweekly: "STRIPE_PRICE_SEDAN_BIWEEKLY",
    envOneTime: "STRIPE_PRICE_SEDAN_ONETIME",
  },
  {
    tier: "crossover",
    name: "Crossover / Mid-SUV",
    description:
      "Family crossovers & mid-size SUVs. Full interior & exterior driveway clean.",
    biweeklyCents: 6000,
    oneTimeCents: 8500,
    envBiweekly: "STRIPE_PRICE_CROSSOVER_BIWEEKLY",
    envOneTime: "STRIPE_PRICE_CROSSOVER_ONETIME",
  },
  {
    tier: "suv",
    name: "Full SUV / Family",
    description: "Full-size SUVs. Full interior & exterior driveway clean.",
    biweeklyCents: 7000,
    oneTimeCents: 9500,
    envBiweekly: "STRIPE_PRICE_SUV_BIWEEKLY",
    envOneTime: "STRIPE_PRICE_SUV_ONETIME",
  },
];

async function getPriceByLookupKey(lookupKey) {
  const list = await stripe.prices.list({
    lookup_keys: [lookupKey],
    active: true,
    limit: 1,
  });
  return list.data[0] ?? null;
}

async function ensureProduct(item) {
  const lookupBiweekly = `hdc_${item.tier}_biweekly`;
  const lookupOneTime = `hdc_${item.tier}_onetime`;

  let biweekly = await getPriceByLookupKey(lookupBiweekly);
  let oneTime = await getPriceByLookupKey(lookupOneTime);

  let productId =
    (biweekly && (typeof biweekly.product === "string" ? biweekly.product : biweekly.product.id)) ||
    (oneTime && (typeof oneTime.product === "string" ? oneTime.product : oneTime.product.id)) ||
    null;

  if (!productId) {
    const listed = await stripe.products.list({ limit: 100, active: true });
    productId =
      listed.data.find((product) => product.metadata?.hdc_tier === item.tier)
        ?.id ?? null;
  }

  if (!productId) {
    const product = await stripe.products.create({
      name: item.name,
      description: item.description,
      metadata: {
        hdc_tier: item.tier,
        hdc_source: "her-driveway-club",
      },
    });
    productId = product.id;
    console.log(`Created product ${item.name} (${productId})`);
  } else {
    await stripe.products.update(productId, {
      name: item.name,
      description: item.description,
      metadata: {
        hdc_tier: item.tier,
        hdc_source: "her-driveway-club",
      },
    });
    console.log(`Updated product ${item.name} (${productId})`);
  }

  if (!biweekly) {
    biweekly = await stripe.prices.create({
      product: productId,
      currency: "usd",
      unit_amount: item.biweeklyCents,
      nickname: "Bi-Weekly Membership",
      lookup_key: lookupBiweekly,
      transfer_lookup_key: true,
      recurring: { interval: "week", interval_count: 2 },
      metadata: { hdc_tier: item.tier, hdc_billing: "bi-weekly" },
    });
    console.log(`  + bi-weekly price ${biweekly.id} ($${(item.biweeklyCents / 100).toFixed(0)} / 2 weeks)`);
  } else {
    console.log(`  = bi-weekly price ${biweekly.id}`);
  }

  if (!oneTime) {
    oneTime = await stripe.prices.create({
      product: productId,
      currency: "usd",
      unit_amount: item.oneTimeCents,
      nickname: "One-Time Wash",
      lookup_key: lookupOneTime,
      transfer_lookup_key: true,
      metadata: { hdc_tier: item.tier, hdc_billing: "one-time" },
    });
    console.log(`  + one-time price ${oneTime.id} ($${(item.oneTimeCents / 100).toFixed(0)})`);
  } else {
    console.log(`  = one-time price ${oneTime.id}`);
  }

  return {
    envBiweekly: item.envBiweekly,
    envOneTime: item.envOneTime,
    biweeklyId: biweekly.id,
    oneTimeId: oneTime.id,
    productId,
    name: item.name,
  };
}

const staleNames = new Set(["sedan", "suv", "truck"]);
const existing = await stripe.products.list({ limit: 100, active: true });
for (const product of existing.data) {
  if (!staleNames.has(product.name.toLowerCase())) continue;
  await stripe.products.update(product.id, { active: false });
  const prices = await stripe.prices.list({ product: product.id, active: true, limit: 20 });
  for (const price of prices.data) {
    await stripe.prices.update(price.id, { active: false });
  }
  console.log(`Archived leftover product "${product.name}" (${product.id})`);
}

const results = [];
for (const item of catalog) {
  results.push(await ensureProduct(item));
}

const envPath = ".env.local";
let envText = readFileSync(envPath, "utf8");
const replacements = {};
for (const row of results) {
  replacements[row.envBiweekly] = row.biweeklyId;
  replacements[row.envOneTime] = row.oneTimeId;
}

for (const [key, value] of Object.entries(replacements)) {
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, "m");
  if (pattern.test(envText)) {
    envText = envText.replace(pattern, line);
  } else {
    envText = envText.replace(/\s*$/, `\n${line}\n`);
  }
}

envText = envText
  .replace(/^STRIPE_PRICE_SEDAN=.*$/m, "")
  .replace(/^STRIPE_PRICE_CROSSOVER=.*$/m, "")
  .replace(/^STRIPE_PRICE_SUV=.*$/m, "")
  .replace(/\n{3,}/g, "\n\n");

writeFileSync(envPath, envText);

console.log("\nCatalog");
for (const row of results) {
  console.log(`- ${row.name}`);
  console.log(`    product:   ${row.productId}`);
  console.log(`    bi-weekly: ${row.biweeklyId}`);
  console.log(`    one-time:  ${row.oneTimeId}`);
}
console.log("\nWrote price IDs to .env.local");
