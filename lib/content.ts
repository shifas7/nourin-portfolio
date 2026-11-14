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

/**
 * Real screenshots for the phone. Drop a 390x844 (or any 9:19.5) image into
 * public/images/screens/ and set its path here; it replaces the illustration.
 * Blur client names you are not allowed to show.
 */
export const screenshots: Partial<Record<ScreenId, string>> = {
  // lead: "/images/screens/meta-lead-ad.jpg",
  // analytics: "/images/screens/analytics.jpg",
  // calendar: "/images/screens/content-calendar.jpg",
  // map: "/images/screens/business-profile.jpg",
  // search: "/images/screens/search-result.jpg",
};

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
    caseId: "content",
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
