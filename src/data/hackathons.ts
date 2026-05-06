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
  // ── Upcoming ──────────────────────────────────────────────────────────────
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
    id: "climate-hack",
    name: "ClimateHack 2026",
    date: "2026-09-10",
    endDate: "2026-09-12",
    mode: "Online",
    prize: "$30,000",
    tags: ["Climate", "Data", "AI"],
    shortDescription: "Use data and AI to solve the most pressing climate challenges.",
    description:
      "ClimateHack pairs technologists with climate scientists to build practical tools for measurement, mitigation and adaptation. Curated datasets, expert mentorship, and dedicated tracks for carbon accounting, renewable energy, and climate modelling.",
    organizer: "Open Climate",
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
      "Build a CLI, library, IDE plugin or service that solves a real developer pain point. Judged by maintainers from popular OSS projects. No theme restrictions — if it makes developers faster, it qualifies.",
    organizer: "DevTools Foundation",
  },
  {
    id: "health-ai-summit-hack",
    name: "HealthAI Hackathon",
    date: "2026-06-27",
    endDate: "2026-06-28",
    mode: "Hybrid",
    location: "Remote + Boston, MA",
    prize: "$40,000",
    tags: ["AI", "Health", "Data"],
    shortDescription: "Apply AI to real clinical and public health challenges in 36 hours.",
    description:
      "HealthAI brings together clinicians, data scientists, and engineers to tackle real-world healthcare problems. Challenges span diagnostics, patient engagement, clinical documentation, and population health. Real de-identified datasets provided with HIPAA-safe access.",
    organizer: "BioMedX Foundation",
    url: "https://healthaihack.org",
  },
  {
    id: "api-world-hack-2026",
    name: "API World Hackathon 2026",
    date: "2026-09-22",
    endDate: "2026-09-24",
    mode: "Hybrid",
    location: "Remote + San Jose, CA",
    prize: "$35,000",
    tags: ["API", "AI", "DevTools"],
    shortDescription: "The world's largest API and cloud developer hackathon.",
    description:
      "Co-located with API World 2026, this hackathon challenges teams to build the most innovative integrations using sponsor APIs across AI, cloud, security, and developer tooling. Prize tracks for best AI integration, best open-source contribution, and best solo hacker.",
    organizer: "DevNetwork",
    url: "https://devpost.com/c/artificial-intelligence",
  },
  {
    id: "solana-hyperdrive-2026",
    name: "Solana Hyperdrive 2026",
    date: "2026-08-15",
    endDate: "2026-09-05",
    mode: "Online",
    prize: "$1,000,000",
    tags: ["Web3", "DeFi", "Infra"],
    shortDescription: "Solana's flagship global hackathon — ship a dApp that scales.",
    description:
      "Hyperdrive is Solana's largest annual online hackathon, spanning three weeks with $1M in prizes across seven tracks: DeFi, gaming, DAOs, mobile, payments, tooling, and wild card. Open to all skill levels with workshops from core Solana engineers.",
    organizer: "Solana Foundation",
    url: "https://solana.com/hackathon",
  },
  {
    id: "eazo-ai-hack-2026",
    name: "Eazo.ai Hackathon",
    date: "2026-07-18",
    endDate: "2026-07-20",
    mode: "Online",
    prize: "$300,000",
    tags: ["AI", "Agents", "LLM"],
    shortDescription: "Win $300K in cash building the next generation of AI agents.",
    description:
      "Eazo.ai's flagship hackathon invites builders to create agentic AI applications — from autonomous coding assistants to multi-agent orchestration pipelines. Tracks include productivity, enterprise automation, and consumer AI.",
    organizer: "Eazo.ai",
    url: "https://eazo.ai",
  },
  {
    id: "developer-week-ny-2026",
    name: "DeveloperWeek NY 2026",
    date: "2026-06-08",
    endDate: "2026-06-10",
    mode: "Hybrid",
    location: "Remote + New York, NY",
    prize: "$25,000",
    tags: ["AI", "API", "DevTools"],
    shortDescription: "Challenge-driven hackathon at DeveloperWeek New York.",
    description:
      "Join 800+ developers at New York's DeveloperWeek for sponsor-driven challenges spanning AI, cloud infrastructure, and developer tooling. Teams judge on progress, concept, and feasibility — with sponsor prize tracks for the best implementation of each API.",
    organizer: "DevNetwork",
    url: "https://developerweek.com",
  },
  {
    id: "innovate-for-impact-2026",
    name: "Innovate for Impact",
    date: "2026-05-12",
    endDate: "2026-05-13",
    mode: "Offline",
    location: "Singapore",
    prize: "$50,000",
    tags: ["AI", "Social Impact", "Product"],
    shortDescription: "Two days of building tech that actually changes lives.",
    description:
      "NGM Group's flagship hackathon invites innovators, tech leaders, and out-of-the-box thinkers to build solutions targeting Southeast Asia's most pressing challenges — healthcare access, financial inclusion, and climate resilience. In-person at NEX, Singapore.",
    organizer: "NGM Group",
  },
  {
    id: "web-summit-micro-hack",
    name: "Web Summit Micro Hack",
    date: "2026-06-17",
    endDate: "2026-06-18",
    mode: "Offline",
    location: "Vancouver, Canada",
    prize: "$10,000",
    tags: ["Product", "AI", "Design"],
    shortDescription: "A fast-paced 24-hour build inside Web Summit Vancouver.",
    description:
      "Co-located with Web Summit Vancouver, this focused micro hackathon challenges teams to ship a working product in 24 hours. Perfect for builders who want conference energy, immediate feedback from 10,000+ attendees, and a tight judging panel of top founders.",
    organizer: "Web Summit",
    url: "https://websummit.com",
  },
  {
    id: "biotech-sprint-2026",
    name: "BioTech Sprint",
    date: "2026-10-02",
    endDate: "2026-10-04",
    mode: "Hybrid",
    location: "Remote + Cambridge, UK",
    prize: "$75,000",
    tags: ["Health", "AI", "Data"],
    shortDescription: "Accelerate drug discovery and diagnostics with code.",
    description:
      "BioTech Sprint challenges interdisciplinary teams of software engineers, biologists, and data scientists to tackle open problems in genomics, drug discovery, clinical trials, and diagnostics. Real datasets provided in partnership with leading UK research hospitals.",
    organizer: "Cambridge BioHub",
  },
  {
    id: "security-ctf-2026",
    name: "HackShield CTF 2026",
    date: "2026-07-25",
    endDate: "2026-07-27",
    mode: "Online",
    prize: "$18,000",
    tags: ["Security", "DevTools", "Open Source"],
    shortDescription: "Capture the flag meets product building — find bugs and fix them.",
    description:
      "HackShield is a hybrid CTF + build hackathon. Day 1 is a classic capture-the-flag competition. Days 2–3, teams use their findings to build open-source security tooling. Prizes for both top CTF scorers and best security product shipped.",
    organizer: "HackShield Labs",
  },
  {
    id: "edtech-hack-2026",
    name: "EduBuild Hackathon",
    date: "2026-08-22",
    endDate: "2026-08-23",
    mode: "Online",
    prize: "$12,000",
    tags: ["AI", "Education", "Product"],
    shortDescription: "Reimagine learning with AI — 36 hours, one big idea.",
    description:
      "EduBuild is focused entirely on education technology. Teams build AI-powered tools for teachers, students, or institutions — from adaptive learning engines to automated grading systems to accessibility tools. Judged by EdTech investors and school district administrators.",
    organizer: "EduBuild Foundation",
  },

  // ── Ongoing ───────────────────────────────────────────────────────────────
  {
    id: "designathon-render",
    name: "Render Designathon",
    date: "2026-05-04",
    endDate: "2026-05-08",
    mode: "Hybrid",
    location: "Remote + NYC",
    prize: "$15,000",
    tags: ["Design", "Product", "Branding"],
    shortDescription: "A week-long sprint for designers shaping bold new product experiences.",
    description:
      "Render is a designathon for product designers. Tackle real briefs from leading startups and present polished case studies to design directors at companies like Linear, Stripe and Vercel. Hybrid format with an in-person final showcase in New York.",
    organizer: "Render Collective",
  },

  // ── Past ─────────────────────────────────────────────────────────────────
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
      "A high-intensity 24-hour build sponsored by leading fintechs. Access to sandbox APIs from Stripe, Wise and Monzo. Prize tracks for best UX, best B2B tool and best technical implementation.",
    organizer: "London Fintech Week",
  },
  {
    id: "developer-week-2026",
    name: "DeveloperWeek 2026 Hackathon",
    date: "2026-02-02",
    endDate: "2026-02-20",
    mode: "Hybrid",
    location: "Remote + San Jose, CA",
    prize: "$50,000",
    tags: ["AI", "API", "DevTools"],
    shortDescription: "The nation's largest challenge-driven hackathon, online and in-person.",
    description:
      "DeveloperWeek's flagship hackathon attracted 800+ participants with sponsor challenges across AI, cloud, and developer tooling. Teams were judged on progress, concept, and feasibility. In-person finals held at the San Jose Convention Center.",
    organizer: "DevNetwork",
    url: "https://developerweek.com/hackathon/",
  },
  {
    id: "devfest-columbia-2026",
    name: "DevFest @ Columbia 2026",
    date: "2026-02-07",
    endDate: "2026-02-09",
    mode: "Offline",
    location: "New York, NY",
    prize: "$30,000",
    tags: ["Web3", "AI", "Open Source"],
    shortDescription: "Columbia University's annual hackathon celebrating all things tech.",
    description:
      "A week-long celebration of technology at Columbia University, featuring workshops, speaker panels, and a hackathon with sponsor tracks from Solana, Google Gemini, and Flowglad. Open to students from all universities worldwide.",
    organizer: "Columbia ADI",
    url: "https://devfest-2026.devpost.com/",
  },
  {
    id: "mega-hack-2026",
    name: "MEGA Hackathon 2026",
    date: "2026-02-28",
    endDate: "2026-03-01",
    mode: "Online",
    prize: "$5,000",
    tags: ["Social Impact", "Education", "Open Source"],
    shortDescription: "STEM meets economics to drive sustainable human development.",
    description:
      "MEGA's annual student hackathon challenges teams to apply computer science, STEM, and economics to UN Sustainable Development Goals 11 and 16. Open to students of all backgrounds with no coding prerequisites. Projects can range from web apps to business plans.",
    organizer: "MEGA Coalition",
    url: "https://mega-hackathon-2026-students.devpost.com/",
  },
  {
    id: "ibm-nccu-ai-hack",
    name: "NCCU AI Hackathon",
    date: "2026-03-19",
    endDate: "2026-03-20",
    mode: "Offline",
    location: "Durham, NC",
    prize: "$10,000",
    tags: ["AI", "Agents", "Health"],
    shortDescription: "Build responsible, agentic AI solutions across key industry tracks.",
    description:
      "Powered by IBM SkillsBuild at North Carolina Central University, this student hackathon challenged teams to design sustainable agentic AI solutions across Healthcare & Life Sciences, Semiconductor Manufacturing, and Education & Workforce Intelligence tracks.",
    organizer: "IBM SkillsBuild × NCCU",
  },
  {
    id: "csu-ai-hackathon",
    name: "CSU AI Hackathon",
    date: "2026-03-16",
    endDate: "2026-03-17",
    mode: "Offline",
    location: "Los Angeles, CA",
    prize: "$10,000",
    tags: ["AI", "Health", "Education"],
    shortDescription: "Cal State LA students tackle AI for real-world industry challenges.",
    description:
      "Powered by IBM SkillsBuild at Cal State LA, this hackathon brought together students from across the CSU system to build responsible AI solutions in Healthcare, Semiconductor Manufacturing, and Education. Hands-on experience with watsonx Orchestrate included.",
    organizer: "IBM SkillsBuild × Cal State LA",
  },
  {
    id: "world-engineering-day-hack",
    name: "World Engineering Day Hackathon",
    date: "2026-01-12",
    endDate: "2026-01-26",
    mode: "Online",
    prize: "$8,000",
    tags: ["Social Impact", "Climate", "Open Source"],
    shortDescription: "Build resilient infrastructure tied to UN SDG 9 in two weeks.",
    description:
      "A global, two-week online hackathon celebrating World Engineering Day. Engineering and non-engineering students worldwide tackled SDG 9 challenges around sustainable industrialisation, smart cities, and digital access. Winners announced on World Engineering Day.",
    organizer: "World Federation of Engineering Organisations",
    url: "https://worldengineeringday.net/",
  },
];
