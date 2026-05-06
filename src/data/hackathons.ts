export type Hackathon = {
  id: string;
  name: string;
  date: string;
  endDate?: string;
  mode: "Online" | "Offline" | "Hybrid";
  location?: string;
  prize: string;
  tags: string[];
  shortDescription: string;
  description: string;
  organizer: string;
  url?: string;
};

export const hackathons: Hackathon[] = [
  {
    id: "ai-genesis-2026",
    name: "AI Genesis 2026",
    date: "2026-06-12",
    endDate: "2026-06-14",
    mode: "Online",
    prize: "$50,000",
    tags: ["AI", "LLM", "Open Source"],
    shortDescription: "Build the next generation of AI-native products in 48 hours.",
    description:
      "AI Genesis is a global, fully online hackathon focused on building AI-native applications. Teams of up to 4 will ship end-to-end products powered by frontier models, with categories ranging from agents to multimodal experiences.",
    organizer: "Genesis Labs",
  },
  {
    id: "web3-builders-summit",
    name: "Web3 Builders Summit",
    date: "2026-07-03",
    endDate: "2026-07-05",
    mode: "Offline",
    location: "Berlin, Germany",
    prize: "$120,000",
    tags: ["Web3", "DeFi", "Infra"],
    shortDescription: "Three days of hacking on the future of decentralized infrastructure.",
    description:
      "Join 800+ builders in Berlin for an intensive in-person hackathon. Work alongside top protocols, ship a working dApp, and pitch to a panel of leading investors and ecosystem leads.",
    organizer: "ETH Builders",
  },
  {
    id: "designathon-render",
    name: "Render Designathon",
    date: "2026-05-20",
    endDate: "2026-05-22",
    mode: "Hybrid",
    location: "Remote + NYC",
    prize: "$15,000",
    tags: ["Design", "Product", "Branding"],
    shortDescription: "A weekend sprint for designers shaping bold new product experiences.",
    description:
      "Render is a designathon for product designers. Tackle real briefs from leading startups and present polished case studies to design directors at companies like Linear, Stripe and Vercel.",
    organizer: "Render Collective",
  },
  {
    id: "climate-hack",
    name: "ClimateHack",
    date: "2026-09-10",
    endDate: "2026-09-12",
    mode: "Online",
    prize: "$30,000",
    tags: ["Climate", "Data", "AI"],
    shortDescription: "Use data and AI to solve the most pressing climate challenges.",
    description:
      "ClimateHack pairs technologists with climate scientists to build practical tools for measurement, mitigation and adaptation. Datasets and mentorship provided.",
    organizer: "Open Climate",
  },
  {
    id: "fintech-rush",
    name: "Fintech Rush",
    date: "2026-04-18",
    endDate: "2026-04-19",
    mode: "Offline",
    location: "London, UK",
    prize: "£25,000",
    tags: ["Fintech", "Payments", "API"],
    shortDescription: "24 hours to reinvent payments, banking and money movement.",
    description:
      "A high-intensity 24-hour build sponsored by leading fintechs. Access to sandbox APIs from Stripe, Wise and Monzo. Prizes for best UX, best B2B tool and best technical implementation.",
    organizer: "London Fintech Week",
  },
  {
    id: "devtools-jam",
    name: "DevTools Jam",
    date: "2026-08-01",
    endDate: "2026-08-03",
    mode: "Online",
    prize: "$20,000",
    tags: ["DevTools", "Open Source", "CLI"],
    shortDescription: "Ship a developer tool that 1,000 engineers will love.",
    description:
      "Build a CLI, library, IDE plugin or service that solves a real developer pain point. Judged by maintainers from popular OSS projects.",
    organizer: "DevTools Foundation",
  },
];
