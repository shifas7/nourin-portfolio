/**
 * All visible copy, sourced from Nourin's resume.
 * Results are her reported figures. Nothing is invented: where a phone screen shows
 * a brand, it says "Your brand" so prospects picture their own business in it.
 */

export const profile = {
  name: "Nourin Nassar",
  role: "Digital Marketer",
  location: "Ernakulam, Kerala",
  email: "nourinnassar10@gmail.com",
  linkedin: "https://www.linkedin.com/in/nourin-nassar-680114258/",
  /** Optional: digits only with country code, e.g. "917736064255". Leave empty to hide the WhatsApp button. */
  whatsapp: "",
};

export type ScreenId =
  | "reel"
  | "giveaway"
  | "channel"
  | "videos"
  | "lead"
  | "analytics"
  | "calendar"
  | "map"
  | "search"
  | "chat";

/**
 * Real screenshots for the phone. Drop a 390x844 (or any 9:19.5) image into
 * public/images/screens/ and set its path here; it replaces the illustration.
 * Blur client names you are not allowed to show.
 */
export const screenshots: Partial<Record<ScreenId, string>> = {
  // giveaway: "/images/screens/silver-storm-giveaway.jpg",
  // channel: "/images/screens/asianet.jpg",
  // videos: "/images/screens/indus-go.jpg",
  // lead: "/images/screens/meta-lead-ad.jpg",
  // map: "/images/screens/business-profile.jpg",
  // search: "/images/screens/search-result.jpg",
};

/**
 * Brands Nourin has worked with.
 * logo: path under public/images/clients/. Brands without a logo show their name.
 * Order matters: the best-known names (Asianet, Jotun, the jewellers, Silver Storm)
 * come first so they fill the top row at every grid width.
 */
export type Client = {
  id: string;
  name: string;
  logo?: string;
  /** Logo is only an icon, so show the name beside it. */
  withName?: boolean;
  /** Squarish logos get a taller box so they balance with wide ones. */
  square?: boolean;
  /** Logo is light, so the tile is dark (near-black unless `tile` sets a colour). */
  dark?: boolean;
  /** Tile background, for logos that sit on their own brand colour. */
  tile?: string;
  /** In-page anchor of the work done for this client (case study or campaigns). */
  work?: string;
  instagram?: string;
};

export const clients: Client[] = [
  // Top row: the names visitors recognise first.
  { id: "asianet", name: "Asianet", logo: "/images/clients/asianet.webp", square: true, work: "#work-asianet", instagram: "https://www.instagram.com/asianet/" },
  { id: "jotun", name: "Jotun Paints", logo: "/images/clients/jotun.svg", instagram: "https://www.instagram.com/jotunpaintsindia/" },
  { id: "pereppadans", name: "Pereppadans Gold & Diamonds", logo: "/images/clients/pereppadans.webp" },
  { id: "leos", name: "Leo's Gold & Diamonds", logo: "/images/clients/leos.webp", square: true },
  { id: "silverstorm", name: "Silver Storm", logo: "/images/clients/silverstorm.webp", square: true, work: "#work-silverstorm", instagram: "https://www.instagram.com/silverstorm.in/" },
  { id: "nakshatra", name: "Nakshatra Gold & Diamonds", logo: "/images/clients/nakshatra.webp" },

  { id: "pooja", name: "Pooja Silver Square", logo: "/images/clients/pooja.webp", square: true, dark: true, tile: "#1a6680" },
  { id: "indusgo", name: "Indus Go", logo: "/images/clients/indusgo.svg", dark: true, work: "#work-indusgo", instagram: "https://www.instagram.com/indusgo.in/" },
  { id: "centresquare", name: "Centre Square Mall", logo: "/images/clients/centresquare.webp", withName: true, work: "#campaigns-centresquare", instagram: "https://www.instagram.com/centresquarekochi/" },
  { id: "palette", name: "Palette Hotels & Resorts", logo: "/images/clients/palette.webp" },
  { id: "channel27", name: "Channel 27", logo: "/images/clients/channel27.webp", square: true },
  { id: "marketcity", name: "Marketcity Mall", instagram: "https://www.instagram.com/marketcity_mall/" },
  { id: "kalliyath", name: "Kalliyath TMT", logo: "/images/clients/kalliyath.webp", instagram: "https://www.instagram.com/kalliyathgroup/" },
  { id: "arabiansignature", name: "Arabian Signature Boutique", logo: "/images/clients/arabiansignature.webp", dark: true, tile: "#5d0000" },
  { id: "vedic", name: "Vedic Village Kodungallur", logo: "/images/clients/vedic.webp", square: true },
  { id: "marikar", name: "Marikar Interiors", logo: "/images/clients/marikar.webp" },
  { id: "florid", name: "Florid Luxury Mattress", logo: "/images/clients/florid.webp", dark: true, tile: "#01192a" },
  { id: "homework", name: "Homework Living", logo: "/images/clients/homework.webp", instagram: "https://www.instagram.com/homeworkliving/" },
  { id: "vanitemonde", name: "Vanité Monde", logo: "/images/clients/vanitemonde.webp", square: true },
  { id: "kamal", name: "Kamal Agencies", logo: "/images/clients/kamal.webp", instagram: "https://www.instagram.com/kamalagencieskodungallur/" },
  { id: "drumstick", name: "Drumstick Metro Eats", logo: "/images/clients/drumstick.webp", dark: true, tile: "#24b24b" },
  { id: "zephyr", name: "Zephyr Windows & Doors", instagram: "https://www.instagram.com/zephyrwindowsanddoors/" },
  { id: "akhilavinod", name: "Dr Akhila Vinod Yogashram", logo: "/images/clients/akhilavinod.webp" },
  { id: "livendo", name: "Livendo", logo: "/images/clients/livendo.webp", square: true },
];

export const proof = [
  { value: "₹10 Cr+", label: "in leads for jewellery clients through Meta Ads, in one quarter" },
  { value: "8M+", label: "impressions from Silver Storm's “Kerala's Biggest Giveaway”" },
  { value: "+80k", label: "Instagram followers for Silver Storm from the same campaign" },
  { value: "+30%", label: "website traffic for agency clients at Moonchild Media" },
];

export type CaseStudy = {
  id: string;
  screen: ScreenId;
  client: string;
  service: string;
  title: string;
  brief: string;
  did: string;
  result: string;
  resultValue?: string;
  /** Link to the live campaign post. */
  post?: string;
};

export const cases: CaseStudy[] = [
  {
    id: "silverstorm",
    screen: "giveaway",
    client: "Silver Storm Water Theme Park, Athirappilly",
    service: "Influencer campaign",
    title: "Kerala's Biggest Giveaway",
    brief: "Grow Silver Storm's social presence and bring more visitors through the gates.",
    did: "Built the campaign around an iPhone 15 Pro giveaway and pushed it through influencer marketing across Kerala.",
    resultValue: "8M+",
    result: "impressions and 80k new Instagram followers, as reported.",
    post: "https://www.instagram.com/p/Cvpq1qDh0uA/",
  },
  {
    id: "asianet",
    screen: "channel",
    client: "Asianet, Star Network",
    service: "Social media partner",
    title: "Prime time, on every feed",
    brief: "Help a leading Malayalam channel stand out online with shows like Star Singer Season 9 and Chandrakantham.",
    did: "Ran a mix of reels, contests, live sessions and short clips from the shows, all checked against platform content policies.",
    result: "Views, watch time, subscribers and engagement all rose over the partnership, as reported.",
  },
  {
    id: "jewellery",
    screen: "lead",
    client: "Jewellery brands",
    service: "Meta Ads",
    title: "Enquiries, not likes",
    brief: "Jewellery clients needed buyers asking for prices and visits, not just likes on a pretty post.",
    did: "Planned Meta lead campaigns, set up audiences and instant forms, and briefed the design team on creatives.",
    resultValue: "₹10 Cr+",
    result: "in leads within one quarter, as reported.",
  },
  {
    id: "indusgo",
    screen: "videos",
    client: "Indus Go",
    service: "Video content",
    title: "24 videos, made for vertical",
    brief: "Create content for the Indus Go brand that people would actually watch on their phones.",
    did: "Proposed an experimental vertical-video concept, then planned and shot 24 videos across three content buckets.",
    resultValue: "24",
    result: "vertical videos that drove engagement for the brand.",
  },
  {
    id: "local",
    screen: "map",
    client: "Local businesses, L4Lavender Media",
    service: "Local search",
    title: "Found on the map",
    brief: "Customers nearby could not find accurate hours, locations or contact details for client businesses.",
    did: "Created and optimised Google Business Profiles and worked with platform support on listing updates.",
    result: "Accurate, more visible local listings for each client.",
  },
  {
    id: "seo",
    screen: "search",
    client: "Client websites, IV Corporation",
    service: "SEO",
    title: "Ranking for real questions",
    brief: "Sites needed organic visibility, including content for a UAE audience.",
    did: "Grouped keyword research into topic clusters, wrote FAQ-led content, ran technical audits and added structured data.",
    result: "Content mapped to search intent and tracked in Search Console.",
  },
];

/** Campaign archive from the Canva portfolio, grouped by brand, with links to the live posts. */
export type Campaign = { name: string; note?: string; post?: string };

export const campaigns: { id: string; brand: string; instagram: string; items: Campaign[] }[] = [
  {
    id: "silverstorm",
    brand: "Silver Storm Water Theme Park",
    instagram: "https://www.instagram.com/silverstorm.in/",
    items: [
      { name: "Summer Vere Level", note: "Positioned the park as the summer getaway to beat the heat.", post: "https://www.instagram.com/p/CqhFd0NPl_d/" },
      { name: "Thrillodu Thrill", note: "School-reopening and monsoon push that kept visitors coming off-season.", post: "https://www.instagram.com/p/Cs_KNMnvnVp/" },
      { name: "Valiya Perunnal Valiya Aavesham", note: "Bakrid family contest that rewarded the largest family group.", post: "https://www.instagram.com/p/Ct1bkyxvDV1/" },
      { name: "Onam Aaveshappooram", note: "Onam celebrations with live shows and sadya on a banana leaf.", post: "https://www.instagram.com/p/Cv_4bNnP2FM/" },
      { name: "Winter Fest", note: "Park, Snow Storm and resort themed for winter, with shows, processions, bands and festive photo booths. One of the biggest campaigns I ran for Silver Storm.", post: "https://www.instagram.com/p/C0ga5zrPuxe/" },
    ],
  },
  {
    id: "centresquare",
    brand: "Centre Square Mall",
    instagram: "https://www.instagram.com/centresquarekochi/",
    items: [
      { name: "Summer of Fashion", post: "https://www.instagram.com/p/CqarXW2LUgP/" },
      { name: "Wings of Love", post: "https://www.instagram.com/p/Coe7q_9vmaV/" },
      { name: "Magical May", post: "https://www.instagram.com/p/Crqdxs7tqJ-/" },
      { name: "Underground Concert", post: "https://www.instagram.com/p/Cs_SgbNustn/" },
    ],
  },
  {
    id: "asianet",
    brand: "Asianet",
    instagram: "https://www.instagram.com/asianet/",
    items: [
      { name: "Star Singer Season 9", post: "https://www.instagram.com/p/C1j4AyMqCKr/" },
      { name: "Chandrakantham", post: "https://www.instagram.com/p/C03b9ozNmA_/" },
    ],
  },
];

export type Service = {
  id: string;
  slug: string;
  name: string;
  goodFor: string;
  includes: string[];
  /** Case study shown on the service page. */
  caseId: string;
  /** Service page SEO */
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  /** Matches an option in briefOptions.services, preselected from the page CTA. */
  briefOption: string;
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    id: "meta",
    slug: "meta-ads-kochi",
    name: "Meta Ads and lead generation",
    goodFor: "Brands that need enquiries this month, not someday.",
    includes: ["Campaign planning", "Audiences and lead forms", "Creative briefs", "Lead and cost reporting"],
    caseId: "jewellery",
    seoTitle: "Meta Ads Marketer in Kochi for Lead Generation",
    seoDescription:
      "Facebook and Instagram lead campaigns planned and run by Nourin Nassar, a Kochi digital marketer behind a reported ₹10 crore in leads for jewellery clients.",
    h1: "Meta Ads that bring enquiries, not just likes",
    intro:
      "Facebook and Instagram lead campaigns for Kerala brands: the right audiences, instant forms that qualify people, and creatives briefed to stop the scroll.",
    briefOption: "Meta Ads",
    faqs: [
      {
        q: "How soon do Meta lead campaigns start bringing enquiries?",
        a: "Most campaigns bring their first leads within days of launch. The first few weeks are for testing audiences and creatives, so cost per lead usually improves after that.",
      },
      {
        q: "What budget do I need to start?",
        a: "You can start small and scale what works. In the brief, tell me your monthly range and I will suggest a split between testing and scaling.",
      },
      {
        q: "Do you make the ad creatives?",
        a: "I plan the angles and write the briefs and copy, and work with your designer or mine on the visuals and reels.",
      },
    ],
  },
  {
    id: "social",
    slug: "social-media-marketing-kochi",
    name: "Social media and reels",
    goodFor: "Brands whose feed has gone quiet.",
    includes: ["Content strategy", "Monthly calendars", "Reels and short-form", "Influencer coordination"],
    caseId: "silverstorm",
    seoTitle: "Social Media Marketing and Reels in Kochi",
    seoDescription:
      "Content strategy, monthly calendars, reels and influencer coordination for Kerala brands, from Kochi digital marketer Nourin Nassar.",
    h1: "A feed people stop scrolling for",
    intro:
      "A monthly content plan, reels with a hook in the first three seconds, and influencer work that fits the brand, so your feed never goes quiet again.",
    briefOption: "Social and reels",
    faqs: [
      {
        q: "How many posts a month do you plan?",
        a: "It depends on the brand and budget. Every plan is laid out on a monthly calendar so you can approve it before anything goes live.",
      },
      {
        q: "Can you work with influencers?",
        a: "Yes. I have coordinated brand promotions with influencers and can shortlist, brief and manage them for you.",
      },
      {
        q: "Do you shoot the reels?",
        a: "I concept and script reels and make short-form edits. For bigger shoots I work with your team or a videographer.",
      },
    ],
  },
  {
    id: "seo",
    slug: "seo-services-kochi",
    name: "SEO",
    goodFor: "Businesses that want to be found without paying for every click.",
    includes: ["Keyword research", "Topic clusters", "On-page fixes", "Technical audits"],
    caseId: "seo",
    seoTitle: "SEO Services in Kochi: Topic Clusters and Technical Audits",
    seoDescription:
      "Keyword research, topic clusters, FAQ-led content, technical audits and structured data from Kochi SEO specialist Nourin Nassar.",
    h1: "SEO that answers what your buyers are searching",
    intro:
      "Keyword research grouped into topic clusters, content written around real questions, and the technical fixes that help search engines understand your pages.",
    briefOption: "SEO",
    faqs: [
      {
        q: "How long does SEO take to show results?",
        a: "SEO compounds over months, not days. Technical fixes can help quickly; content and rankings build steadily after that, tracked in Search Console.",
      },
      {
        q: "Which tools do you use?",
        a: "Semrush and Screaming Frog for research and audits, Google Search Console for tracking, and Tag Manager for structured data.",
      },
      {
        q: "Can you write content for audiences outside Kerala?",
        a: "Yes. I have planned and written locally focused content for a UAE audience.",
      },
    ],
  },
  {
    id: "local",
    slug: "google-business-profile-kerala",
    name: "Local search",
    goodFor: "Showrooms, clinics, cafes and stores with a real address.",
    includes: ["Google Business Profile", "Listing updates", "Local content", "Map visibility"],
    caseId: "local",
    seoTitle: "Google Business Profile Optimisation in Kerala",
    seoDescription:
      "Google Business Profile setup and optimisation for Kerala showrooms, clinics and stores, so nearby customers find the right details. By Nourin Nassar.",
    h1: "Be the business people find on the map",
    intro:
      "Google Business Profiles set up and optimised so nearby customers see the right hours, location, photos and contact details, and choose you.",
    briefOption: "Local search",
    faqs: [
      {
        q: "Can you fix a listing that has the wrong details?",
        a: "Yes. I update listings and work with platform support when changes need to go through Google.",
      },
      {
        q: "Do I need a website for local search?",
        a: "It helps, but a well-kept Business Profile alone can bring calls and visits. I can advise on both.",
      },
      {
        q: "How do I know it is working?",
        a: "Your profile shows calls, direction requests and website visits. We review those numbers together.",
      },
    ],
  },
];

export const process = [
  { verb: "Audit", line: "I look at your accounts, site and competitors to find what is leaking." },
  { verb: "Plan", line: "A clear plan with channels, content, budget split and the number we are chasing." },
  { verb: "Launch", line: "Campaigns, content and fixes go live, tested in small steps before scaling." },
  { verb: "Report", line: "Plain reports on leads and cost, then we double down on what works." },
];

export const jobs = [
  { company: "IV Corporation", role: "SEO Intern", dates: "2026" },
  { company: "L4Lavender Media", role: "Digital Marketing Executive", dates: "2024 - 2025" },
  { company: "Moonchild Media", role: "Digital Marketing Executive", dates: "2022 - 2024" },
  { company: "Victara Global", role: "Digital Marketing Intern", dates: "2022" },
];

export const credentials = [
  "PG Diploma, PR and Advertising, Kerala Media Academy",
  "Advanced SEO, Clear My Course",
  "Google Fundamentals of Digital Marketing",
  "HubSpot Digital Marketing",
];

export const briefOptions = {
  services: ["Free 15-min audit", "Meta Ads", "Social and reels", "SEO", "Local search", "Not sure yet"],
  budgets: ["Under ₹25k / month", "₹25k to ₹1L / month", "₹1L to ₹3L / month", "Over ₹3L / month"],
  timelines: ["As soon as possible", "This month", "Next quarter"],
};
