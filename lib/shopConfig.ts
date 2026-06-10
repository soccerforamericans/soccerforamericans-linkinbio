/**
 * shopConfig.ts - the products on your /shop page.
 *
 * STRATEGY (read this!): you don't have inventory or a Shopify store
 * yet, so every product links out to an Amazon search for that item.
 * Those links work TODAY - and because each goes through /go/<slug>,
 * your stats show exactly which products your audience clicks.
 *
 * THE MONEY STEP: join Amazon Associates (free, affiliate.amazon.com).
 * Once approved, replace each `url` below with your tagged product
 * link from their "SiteStripe" toolbar, and every purchase made after
 * a click pays you 3-4% commission. Until then the shop still works -
 * it just builds data instead of commission.
 *
 * The lineup is picked for summer 2026: World Cup hype + proven
 * TikTok-soccer sellers (grip socks are a genuine phenomenon).
 */

export type Product = {
  slug: string;       // unique, used in /go/<slug> and your stats
  title: string;      // shown on the card
  blurb: string;      // one opinionated line on why it's worth buying
  price: string;      // rough range, shown as "from ..."
  emoji: string;      // stands in for a product photo
  url: string;        // CHANGE to your tagged affiliate link when approved
};

export const products: Product[] = [
  {
    slug: "p-usa-jersey",
    title: "USA 2026 home jersey",
    blurb: "The home World Cup shirt. Everyone wants one this summer - buy before the knockouts sell sizes out.",
    price: "$80-100",
    // (a flag emoji here renders as plain "US" text on Windows desktops)
    emoji: "👕",
    url: "https://www.amazon.com/s?k=usa+soccer+jersey+2026+nike",
  },
  {
    slug: "p-wc-ball",
    title: "Official World Cup match ball",
    blurb: "The actual adidas tournament ball. Instant centerpiece of every park kickabout.",
    price: "$30-170",
    emoji: "⚽",
    url: "https://www.amazon.com/s?k=adidas+world+cup+2026+official+match+ball",
  },
  {
    slug: "p-grip-socks",
    title: "Grip socks",
    blurb: "What the pros actually wear under their socks. The biggest soccer-TikTok product of the last two years.",
    price: "$15-25",
    emoji: "🧦",
    url: "https://www.amazon.com/s?k=soccer+grip+socks",
  },
  {
    slug: "p-cleats",
    title: "Cleats the pros wear",
    blurb: "Mercurials and Predators - the boots you see at the World Cup, in your size.",
    price: "$60-250",
    emoji: "👟",
    url: "https://www.amazon.com/s?k=nike+mercurial+soccer+cleats",
  },
  {
    slug: "p-mini-goal",
    title: "Pop-up backyard goal",
    blurb: "Sets up in 30 seconds. The thing every kid demands after watching a World Cup match.",
    price: "$30-60",
    emoji: "🥅",
    url: "https://www.amazon.com/s?k=pop+up+soccer+goal+backyard",
  },
  {
    slug: "p-fc26",
    title: "EA Sports FC 26",
    blurb: "The World Cup, playable. What everyone's running between real matches.",
    price: "$40-70",
    emoji: "🎮",
    url: "https://www.amazon.com/s?k=ea+sports+fc+26",
  },
  {
    slug: "p-flags",
    title: "National team flags",
    blurb: "Watch-party essential. Cheap, loud, and they make every photo better.",
    price: "$8-20",
    emoji: "🚩",
    url: "https://www.amazon.com/s?k=world+cup+2026+country+flags",
  },
  {
    slug: "p-rebounder",
    title: "Training rebounder",
    blurb: "First touch like the players you post about. The most-gifted training gear in soccer.",
    price: "$40-120",
    emoji: "🎯",
    url: "https://www.amazon.com/s?k=soccer+rebounder+training",
  },
];
