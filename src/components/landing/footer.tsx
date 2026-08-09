import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const footerLinks = {
  help: [
    { label: "route schedule", href: "#route-schedule" },
    { label: "pricing", href: "#pricing" },
    { label: "faq", href: "#faq" },
    { label: "how it works", href: "#zero-friction" },
    { label: "contact", href: "mailto:hello@redondodetail.com" },
  ],
  about: [
    { label: "about us", href: "#about" },
    { label: "our promise", href: "#promise" },
    { label: "coastal care", href: "#coastal-care" },
    { label: "work & transformations", href: "#transformations" },
    { label: "woman-owned business", href: "#about" },
  ],
  information: [
    { label: "terms and conditions", href: "/terms" },
    { label: "privacy policy", href: "/privacy" },
    { label: "insurance coverage", href: "/insurance" },
    { label: "liability waiver", href: "/liability" },
    { label: "satisfaction guarantee", href: "#promise" },
  ],
};

function SocialIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <SocialIcon className="size-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </SocialIcon>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <SocialIcon className="size-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
      </SocialIcon>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <SocialIcon className="size-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </SocialIcon>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <SocialIcon className="size-5">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </SocialIcon>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer text-charcoal">
      <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {(
            Object.entries(footerLinks) as [string, typeof footerLinks.help][]
          ).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-4 text-sm font-semibold lowercase text-charcoal">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm lowercase text-charcoal/80 transition-colors hover:text-charcoal hover:underline hover:underline-offset-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs lowercase tracking-wide text-charcoal/75">
          <span>woman-owned &amp; operated</span>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <span>fully insured</span>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <span>bonded for driveway service</span>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          {socialLinks.map(({ label, href, icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="text-charcoal transition-opacity hover:opacity-60"
            >
              {icon}
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center font-brand text-4xl font-normal lowercase tracking-[-0.02em] text-charcoal sm:text-5xl">
          {siteConfig.businessName.toLowerCase()}
        </p>

        <p className="mx-auto mt-4 max-w-md text-center text-xs lowercase leading-relaxed text-charcoal/70">
          a woman-owned coastal mobile car wash club. white-glove driveway
          service under full liability insurance—so busy parents get weekends
          back.
        </p>

        <p className="mt-6 text-center text-xs lowercase text-charcoal/70">
          © {year}, {siteConfig.businessName.toLowerCase()} | launching newport
          beach · palos verdes · south bay next
        </p>
      </div>
    </footer>
  );
}
