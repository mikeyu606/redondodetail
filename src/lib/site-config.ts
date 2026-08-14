/** Update founderName with your first name */
export const siteConfig = {
  founderName: "Sophie",
  businessName: "Her Driveway Club",
  serviceArea: "Redondo Beach",
  founderSchool: "UCLA",
  tagline:
    "Woman-owned driveway car washes for busy parents. Plant-based, non-toxic deep cleans—safe for kids and pets.",
  promise: {
    title: "Her Driveway Club Promise",
    text: "If you aren't 100% delighted with your wash, tell us within 24 hours. We'll come straight back to make it right—or refund 100% of your payment, no questions asked.",
  },
  /** Hero photo — swap src anytime */
  hero: {
    src: "/door.png",
    alt: "Freshly washed family SUV in a coastal driveway",
  },
} as const;
