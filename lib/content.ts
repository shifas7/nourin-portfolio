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
  linkedin: "https://www.linkedin.com/in/nourin-nassar",
  /** Optional: digits only with country code, e.g. "917736064255". Leave empty to hide the WhatsApp button. */
  whatsapp: "",
};

export type ScreenId = "reel" | "lead" | "analytics" | "calendar" | "map" | "search" | "chat";

export const proof = [
  { value: "₹10 Cr+", label: "in leads for jewellery clients through Meta Ads, in one quarter" },
  { value: "+30%", label: "website traffic for agency clients at Moonchild Media" },
  { value: "+20%", label: "more leads from the same accounts" },
  { value: "4 yrs", label: "across four Kochi agencies, from social to search" },
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
};

export const cases: CaseStudy[] = [
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
    id: "traffic",
    screen: "analytics",
    client: "Agency clients, Moonchild Media",
    service: "Digital strategy",
    title: "More visits, more leads",
    brief: "Client websites were not getting the traffic or the enquiries their brands deserved.",
    did: "Planned the digital strategy, led a team of specialists and kept every campaign on schedule.",
    resultValue: "+30%",
    result: "website traffic and +20% lead generation, as reported.",
  },
  {
    id: "content",
    screen: "calendar",
    client: "Agency clients",
    service: "Content and reels",
    title: "A feed worth stopping for",
    brief: "Brands posted when they remembered, so feeds went quiet and reels never got made.",
    did: "Concepted and made reels and short-form video, and planned every client's month ahead on a calendar.",
    result: "Consistent monthly calendars for every account she ran.",
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

export const services = [
  {
    id: "meta",
    name: "Meta Ads and lead generation",
    goodFor: "Brands that need enquiries this month, not someday.",
    includes: ["Campaign planning", "Audiences and lead forms", "Creative briefs", "Lead and cost reporting"],
  },
  {
    id: "social",
    name: "Social media and reels",
    goodFor: "Brands whose feed has gone quiet.",
    includes: ["Content strategy", "Monthly calendars", "Reels and short-form", "Influencer coordination"],
  },
  {
    id: "seo",
    name: "SEO",
    goodFor: "Businesses that want to be found without paying for every click.",
    includes: ["Keyword research", "Topic clusters", "On-page fixes", "Technical audits"],
  },
  {
    id: "local",
    name: "Local search",
    goodFor: "Showrooms, clinics, cafes and stores with a real address.",
    includes: ["Google Business Profile", "Listing updates", "Local content", "Map visibility"],
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
  services: ["Meta Ads", "Social and reels", "SEO", "Local search", "Not sure yet"],
  budgets: ["Under ₹25k / month", "₹25k to ₹1L / month", "₹1L to ₹3L / month", "Over ₹3L / month"],
  timelines: ["As soon as possible", "This month", "Next quarter"],
};
