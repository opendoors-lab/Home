export const routes = {
  home: "/",
  about: "/about",
  howItWorks: "/how-it-works",
  features: "/features",
  safety: "/safety",
  drivers: "/drivers",
  riders: "/riders",
  costSharing: "/cost-sharing",
  sustainability: "/sustainability",
  rewards: "/rewards",
  faq: "/faq",
  getStarted: "/get-started",
  blog: "/blog",
  newsfeed: "/newsfeed",
  adminLogin: "/admin/login",
  admin: "/admin",
  adminPostsNew: "/admin/posts/new",
  adminReview: "/admin/review",
} as const;

export type RouteKey = keyof typeof routes;

export const mainNav = [
  { label: "About", href: routes.about },
  { label: "How it works", href: routes.howItWorks },
  { label: "Features", href: routes.features },
  { label: "Safety", href: routes.safety },
  { label: "Newsfeed", href: routes.newsfeed },
  { label: "Rewards", href: routes.rewards },
  { label: "FAQ", href: routes.faq },
] as const;

export const footerNav = {
  product: [
    { label: "About Us", href: routes.about },
    { label: "How it works", href: routes.howItWorks },
    { label: "Features", href: routes.features },
    { label: "Safety & Security", href: routes.safety },
    { label: "Cost-sharing", href: routes.costSharing },
  ],
  community: [
    { label: "For ride givers", href: routes.drivers },
    { label: "For riders", href: routes.riders },
    { label: "Sustainability", href: routes.sustainability },
    { label: "Rewards & Milestones", href: routes.rewards },
  ],
  support: [
    { label: "Newsfeed", href: routes.newsfeed },
    { label: "Blog", href: routes.blog },
    { label: "FAQ", href: routes.faq },
    { label: "Get the app", href: routes.getStarted },
  ],
} as const;

export const explorePages = [
  {
    href: routes.about,
    title: "About Us",
    description: "Our mission, the gap we bridge, and what makes MobiMates different.",
    icon: "heart" as const,
  },
  {
    href: routes.howItWorks,
    title: "How it works",
    description: "Verify, match, confirm with OTP, and ride — eight clear steps.",
    icon: "route" as const,
  },
  {
    href: routes.features,
    title: "Features",
    description: "Digital ID, smart matching, live tracking, and more.",
    icon: "sparkles" as const,
  },
  {
    href: routes.safety,
    title: "Safety & Security",
    description: "Trust built in before every trip starts.",
    icon: "shield" as const,
  },
  {
    href: routes.drivers,
    title: "For ride givers",
    description: "Share your route, help a neighbor, offset fuel costs.",
    icon: "car" as const,
  },
  {
    href: routes.riders,
    title: "For riders",
    description: "Skip the queue — comfort without taxi fares.",
    icon: "users" as const,
  },
  {
    href: routes.costSharing,
    title: "Cost-sharing",
    description: "Fair contributions, not commercial taxi fares.",
    icon: "coins" as const,
  },
  {
    href: routes.sustainability,
    title: "Community impact",
    description: "Less congestion, cleaner city, stronger bonds.",
    icon: "leaf" as const,
  },
  {
    href: routes.rewards,
    title: "Rewards & Milestones",
    description: "Coffee on us and instant trip validation.",
    icon: "coffee" as const,
  },
] as const;
