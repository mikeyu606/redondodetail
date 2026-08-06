"use client";

import {
  siPorsche,
  siTesla,
  siBmw,
  siAudi,
  siFord,
  siLucid,
} from "simple-icons";

type BrandIconData = {
  name: string;
  path: string;
};

const mercedesBenz: BrandIconData = {
  name: "Mercedes-Benz",
  path: "M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12S0 18.623 0 12 5.377 0 12 0zM3.245 17.539A10.357 10.357 0 0012 22.36c3.681 0 6.917-1.924 8.755-4.821L12 14.203zm10.663-6.641l7.267 5.915A10.306 10.306 0 0022.36 12c0-5.577-4.417-10.131-9.94-10.352zm-2.328-9.25C6.057 1.869 1.64 6.423 1.64 12c0 1.737.428 3.374 1.185 4.813l7.267-5.915z",
};

const brands: BrandIconData[] = [
  { name: "Porsche", path: siPorsche.path },
  { name: "Tesla", path: siTesla.path },
  { name: "BMW", path: siBmw.path },
  mercedesBenz,
  { name: "Audi", path: siAudi.path },
  { name: "Ford", path: siFord.path },
  { name: "Lucid", path: siLucid.path },
];

function BrandIcon({ path, name }: BrandIconData) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="size-8 fill-current text-charcoal/35 sm:size-10"
      aria-label={name}
    >
      <path d={path} />
    </svg>
  );
}

export function BrandCarousel() {
  return (
    <section className="border-y border-border bg-beige py-12">
      <p className="mb-7 text-center text-[11px] font-semibold tracking-[0.2em] text-slate/75 uppercase">
        Vehicles We Regularly Service
      </p>

      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-12">
        {brands.map((brand) => (
          <div key={brand.name} className="flex items-center justify-center">
            <BrandIcon path={brand.path} name={brand.name} />
          </div>
        ))}
      </div>
    </section>
  );
}
