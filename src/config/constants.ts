/* eslint-disable max-lines -- consolidated site copy; keep all strings in this file */
/**
 * Site copy — single place to edit user-visible text and structured content.
 */

// ——— Identity ———
export const NAME = 'Abhishek Panthalingal';
export const LOCATION = 'Bellevue, WA';
/** Single-line role title (schema, OG, footer one-liners, etc.) */
export const JOB_TITLE = 'Director, AI & Analytics Practice';

// ——— Navigation ———
export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Now', href: '#now' },
  { label: 'Contact', href: '#contact' },
] as const;

/** Landmark label for the primary `<nav>` (accessibility). */
export const NAVIGATION_LANDMARK_LABEL = 'Primary';
export const BRAND_BACK_TO_MAIN_SUFFIX = ', back to main content';

export function brandBackToMainAriaLabel(personName: string): string {
  return `${personName}${BRAND_BACK_TO_MAIN_SUFFIX}`;
}

export const RESUME_URL = '/resume.pdf';
export const RESUME_BUTTON_LABEL = 'Resume';
/* eslint-disable no-warning-comments -- proposed copy pending owner confirmation */
// TODO(owner): confirm
export const GET_IN_TOUCH_LABEL = 'Get in touch';
/* eslint-enable no-warning-comments */

export const MOBILE_MENU_OPEN_LABEL = 'Open menu';
export const MOBILE_MENU_CLOSE_LABEL = 'Close menu';
export const MOBILE_SITE_MENU_DIALOG_LABEL = 'Site menu';

// ——— Layout & shell ———
export const SKIP_TO_MAIN_LABEL = 'Skip to main content';

// ——— Spotify (Now block; fetched client-side) ———
export const STATUS_LISTENING = 'Currently listening to';
export const STATUS_RECENT = 'Recently played';
export const STATUS_NOTHING = 'Nothing playing';
export const SPOTIFY_STATUS_BEFORE_TRACK = ': ';
/* eslint-disable no-warning-comments -- proposed copy pending owner confirmation */
// TODO(owner): confirm
export const STATUS_LOADING = 'Checking what’s playing';
// TODO(owner): confirm
export const STATUS_UNAVAILABLE = 'Couldn’t load listening status';
/* eslint-enable no-warning-comments */

// ——— Social ———
export const SOCIAL_LINKS = [
  {
    url: 'https://github.com/abhisheknairofficial',
    label: 'GitHub',
  },
  {
    url: 'https://linkedin.com/in/6foot4',
    label: 'LinkedIn',
  },
];

export const SAME_AS_PROFILE_URLS = SOCIAL_LINKS.map((link) => {
  return link.url;
});

export function socialProfileLinkAriaLabel(networkLabel: string): string {
  return `Visit ${networkLabel} profile (opens in new tab)`;
}

export function spotifyTrackLinkAriaLabel(trackName: string): string {
  return `Open ${trackName} on Spotify (opens in new tab)`;
}

// ——— Hero ———
export const POSITIONING_HEADLINE =
  'Director, AI & Analytics Practice at Rhombuz LLC';

/* eslint-disable no-warning-comments -- proposed copy pending owner confirmation */
// TODO(owner): confirm
export const HERO_INTRO =
  'AI, analytics, and product engineering leader with approximately nine years of progressive experience in software engineering, enterprise analytics, cloud-native platforms, solution architecture, and technical team leadership. Appointed Director, AI & Analytics Practice at Rhombuz LLC in October 2026, following service as Lead Product Technologist. Experience delivering data-driven platforms and AI-enabled applications for enterprise clients including T-Mobile US, TOMRA, Albertsons, and Comcast.';
/* eslint-enable no-warning-comments */

export const NOW_FOCUS =
  'Reports directly to the CEO and leads the AI & Analytics practice, including AI-led programs for Piktorlabs and development of Rhombuz’s Data Experience Workbench (DEW) platform.';

/* eslint-disable no-warning-comments -- proposed copy pending owner confirmation */
// TODO(owner): confirm
export const SYSTEMS_DIAGRAM_TITLE = 'Systems beyond the browser';
/* eslint-enable no-warning-comments */

export const SYSTEMS_DIAGRAM_DESCRIPTION =
  'Experience delivering data-driven platforms and AI-enabled applications for enterprise clients including T-Mobile US, TOMRA, Albertsons, and Comcast.';

export const SYSTEMS_LAYER_BROWSER = 'Browser';
export const SYSTEMS_LAYER_DEVICE = 'Device';
/* eslint-disable no-warning-comments -- proposed copy pending owner confirmation */
// TODO(owner): confirm
export const SYSTEMS_LAYER_NETWORK = 'Data / AI';
/* eslint-enable no-warning-comments */
export const SYSTEMS_LAYER_CLOUD = 'Cloud';

export const SYSTEMS_LAYER_CAPTION_BROWSER =
  'Albertsons: React/Next.js architecture that improved page-load speed by 30% and reduced maintenance overhead by 25%.';
export const SYSTEMS_LAYER_CAPTION_DEVICE =
  'TOMRA: iPadOS application integrating industrial weighing and display devices over Bluetooth Low Energy; supported rollout to at least five California collection locations.';
export const SYSTEMS_LAYER_CAPTION_NETWORK =
  'T-Mobile: Databricks-based anomaly detection for 5G network performance; Databricks-hosted Llama 70B for root-cause analysis and recommended actions.';
export const SYSTEMS_LAYER_CAPTION_CLOUD =
  'T-Mobile: Azure service migration and private-network cutover; resolved authentication issues across Azure Container Apps, Cosmos DB, and Entra ID.';

/* eslint-disable no-warning-comments -- proposed copy pending owner confirmation */
// TODO(owner): confirm
export const META_DESCRIPTION =
  `Portfolio of ${NAME} — Director, AI & Analytics Practice at Rhombuz LLC. Approximately nine years in software engineering, enterprise analytics, cloud-native platforms, solution architecture, and technical team leadership.`;
/* eslint-enable no-warning-comments */

// ——— Experience ———
export const EXPERIENCE_TITLE = 'Experience';

export const TIMELINE_DATA = [
  {
    id: 5,
    period: 'Oct 2026 — Present',
    company: 'Rhombuz LLC',
    role: 'Director, AI & Analytics Practice',
    description:
      'Reports directly to the CEO and leads the AI & Analytics practice, including AI-led programs for Piktorlabs and development of Rhombuz’s Data Experience Workbench (DEW) platform.',
    highlights: [
      'Leads all AI-led programs of Piktorlabs, overseeing program priorities and coordination of AI and analytics initiatives.',
      'Responsible for development of Rhombuz’s Data Experience Workbench (DEW), a strategic platform intended to be a core part of the company’s future product offering.',
      'Leads recruitment and technical evaluation for AI, analytics, and engineering roles; oversees onboarding, training, mentoring, and professional development.',
    ],
  },
  {
    id: 4,
    period: 'Apr 2025 — Sep 2026',
    company: 'Rhombuz LLC',
    role: 'Lead Product Technologist',
    description:
      'Provided technical leadership, solution architecture ownership, direct client engagement, and input into technical hiring across T-Mobile US and TOMRA programs.',
    highlights: [
      'T-Mobile — Executive Network Analytics: architected an executive analytics platform supporting network build, performance, and planning decisions; designed a five-level geographic data hierarchy spanning more than 80 markets; developed reporting views using Snowflake and Azure PostgreSQL over datasets ingesting millions of rows daily; implemented Azure Application Insights and KQL usage analytics, including adoption and retention metrics.',
      'T-Mobile — AI & Anomaly Detection: built Databricks-based anomaly detection for 5G network performance; integrated a Databricks-hosted Llama 70B model to produce understandable root-cause analysis and recommended actions.',
      'T-Mobile — Cloud Engineering: led Azure service migration and private-network cutover; resolved authentication issues across Azure Container Apps, Cosmos DB, and Entra ID; managed CI/CD and deployment credentials.',
      'T-Mobile — Supply Chain: owned UI and API architecture for a control tower application providing visibility into device distribution, inventory, and servicing.',
      'TOMRA — Industrial Application: designed and delivered an iPadOS application integrating industrial weighing and display devices over Bluetooth Low Energy; supported rollout to at least five California collection locations.',
      'Internal: developed technical interview frameworks; explored on-premises AI inference architectures for data-residency needs; built a briefing workflow with prompt-injection safeguards.',
    ],
  },
  {
    id: 3,
    period: 'Jan 2023 — Mar 2025',
    company: 'UST',
    role: 'Lead II, Software Engineering',
    description:
      'Led frontend development for an enterprise retail product at Albertsons and MVP development at Comcast. Developed executive decision-support dashboards at T-Mobile.',
    highlights: [
      'Albertsons: designed React/Next.js architecture that improved page-load speed by 30% and reduced maintenance overhead by 25%; improved test coverage by more than 20% using AI-assisted tools.',
      'Comcast: led MVP development across interdisciplinary teams; implemented Docker, Kubernetes, and CI/CD pipelines, reducing deployment times by 40%.',
      'T-Mobile: developed executive decision-support dashboards and optimized a data visualization library, improving Lighthouse performance scores from 75 to at least 95.',
    ],
  },
  {
    id: 2,
    period: 'Jun 2019 — Dec 2022',
    company: 'Piktorlabs',
    role: 'Senior Design Technologist / Product Engineer',
    description:
      'Led engineering engagements including T-Mobile contract work and end-to-end delivery of GoTag, from design through ADP Marketplace release and compliance testing.',
    highlights: [
      'Built cross-platform React Native applications for iOS and Android, reducing development redundancy by 40%.',
      'Improved application performance through state-management and network optimizations.',
      'Used Docker and Kubernetes to support scalable application deployment.',
    ],
  },
  {
    id: 1,
    period: 'Sep 2017 — May 2019',
    company: 'Moonraft Innovation Labs',
    role: 'Software Engineer',
    description:
      'Developed features for NorthStar, an enterprise application serving more than 17,000 users.',
    highlights: [
      'Delivered the organization’s first React.js project, helped drive internal adoption, and mentored junior developers through workshops.',
    ],
  },
];

// ——— Work / Projects ———
export const WORK_TITLE = 'Work';

export interface Project {
  title: string;
  client?: string;
  summary: string;
  role: string;
  outcomes: string[];
  link?: string;
  github?: string;
}

export function projectExternalLinkAriaLabel(projectTitle: string): string {
  return `View ${projectTitle} (opens in new tab)`;
}

export const PROJECTS: Project[] = [
  {
    title: 'Data Experience Workbench (DEW)',
    client: 'Rhombuz LLC',
    summary:
      'Responsible for development of Rhombuz’s Data Experience Workbench (DEW), a strategic platform intended to be a core part of the company’s future product offering.',
    role: 'Director, AI & Analytics Practice',
    outcomes: ['Strategic platform intended as a core part of the company’s future product offering'],
  },
  {
    title: 'Executive Network Analytics',
    client: 'T-Mobile',
    summary:
      'Architected an executive analytics platform supporting network build, performance, and planning decisions. Designed a five-level geographic data hierarchy spanning more than 80 markets. Developed reporting views using Snowflake and Azure PostgreSQL over datasets ingesting millions of rows daily. Implemented Azure Application Insights and KQL usage analytics, including adoption and retention metrics.',
    role: 'Lead Product Technologist',
    outcomes: [
      'Five-level geographic hierarchy spanning more than 80 markets',
      'Reporting over datasets ingesting millions of rows daily',
    ],
  },
  {
    title: 'AI & Anomaly Detection',
    client: 'T-Mobile',
    summary:
      'Built Databricks-based anomaly detection for 5G network performance. Integrated a Databricks-hosted Llama 70B model to produce understandable root-cause analysis and recommended actions.',
    role: 'Lead Product Technologist',
    outcomes: [
      '5G network anomaly detection in Databricks',
      'Llama 70B root-cause analysis and recommended actions',
    ],
  },
  {
    title: 'Supply Chain Control Tower',
    client: 'T-Mobile',
    summary:
      'Owned UI and API architecture for a control tower application providing visibility into device distribution, inventory, and servicing.',
    role: 'Lead Product Technologist',
    outcomes: ['Owned UI and API architecture for a control tower application providing visibility into device distribution, inventory, and servicing'],
  },
  {
    title: 'Industrial Collection App',
    client: 'TOMRA',
    summary:
      'Designed and delivered an iPadOS application integrating industrial weighing and display devices over Bluetooth Low Energy. Supported rollout to at least five California collection locations.',
    role: 'Lead Product Technologist',
    outcomes: [
      'iPadOS and BLE industrial weighing and display',
      'Supported rollout to at least five California collection locations',
    ],
  },
  {
    title: 'Enterprise Retail Frontend',
    client: 'Albertsons',
    summary:
      'Led frontend development for an enterprise retail product. Designed React/Next.js architecture that improved page-load speed by 30% and reduced maintenance overhead by 25%. Improved test coverage by more than 20% using AI-assisted tools. Guided UX implementation, security hardening, cross-functional collaboration, and client communications.',
    role: 'Lead II, Software Engineering',
    outcomes: [
      '30% page-load improvement',
      '25% reduction in maintenance overhead',
      'More than 20% test coverage improvement',
    ],
  },
];

// ——— Skills ———
export const SKILLS_TITLE = 'Expertise';

export const SKILL_CATEGORIES = [
  {
    title: 'Cloud & Data',
    skills: [
      'Microsoft Azure',
      'App Service',
      'Container Apps',
      'Functions',
      'Cosmos DB',
      'PostgreSQL',
      'Application Insights',
      'Entra ID',
      'Private Endpoints',
      'Databricks',
      'Snowflake',
      'AWS',
      'SQL',
      'KQL',
    ],
  },
  {
    title: 'AI & Analytics',
    skills: [
      'LLM application integration',
      'Anomaly detection',
      'Prompt engineering',
      'Prompt-injection guardrails',
      'MCP-based tooling',
    ],
  },
  {
    title: 'Engineering',
    skills: [
      'React',
      'Next.js',
      'React Native',
      'Redux',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Express',
      'GraphQL',
      'REST APIs',
      'MongoDB',
    ],
  },
  {
    title: 'Platforms & Practices',
    skills: [
      'Docker',
      'Kubernetes',
      'GitLab CI/CD',
      'Agile/Scrum',
      'TDD',
      'Architecture',
      'Code review',
      'Mentoring',
      'BLE and industrial hardware integration',
    ],
  },
];

// ——— Clients ———
export const CLIENTS_TITLE = 'Clients';

export const CLIENTS_DATA = [
  { name: 'T-Mobile', context: 'Network analytics, AI, cloud, and supply chain' },
  { name: 'TOMRA', context: 'Industrial iPadOS application' },
  { name: 'Albertsons', context: 'Enterprise retail frontend' },
  { name: 'Comcast', context: 'MVP development' },
];

// ——— Now ———
export const NOW_TITLE = 'Now';

// ——— Contact ———
export const CONTACT_TITLE = 'Get in Touch';
/* eslint-disable no-warning-comments -- proposed copy pending owner confirmation */
// TODO(owner): confirm
export const CONTACT_TEXT =
  'The best way to reach me is email.';
/* eslint-enable no-warning-comments */
export const CONTACT_EMAIL = 'abhisheknr4@gmail.com';

// ——— Footer ———
export const COPYRIGHT_YEAR = 2026;

// ——— Theme ———
export const THEME_ARIA_LIGHT = 'Switch to light mode';
export const THEME_ARIA_DARK = 'Switch to dark mode';

// ——— Error & not found ———
export const ERROR_PAGE_TITLE = 'Something went wrong';
export const ERROR_PAGE_DESCRIPTION = 'An unexpected error occurred. Please try again.';
export const ERROR_PAGE_TRY_AGAIN = 'Try again';

export const NOT_FOUND_CODE = '404';
export const NOT_FOUND_TITLE = 'Page not found';
export const NOT_FOUND_DESCRIPTION = 'The page you are looking for does not exist or has been moved.';
export const NOT_FOUND_BACK_HOME = 'Back to home';

// ——— Open Graph image (src/app/opengraph-image/route.tsx) ———
export const OG_IMAGE_ALT = `${NAME} — ${JOB_TITLE}`;
export const OG_IMAGE_KICKER = JOB_TITLE;
export const OG_IMAGE_TAGLINE = POSITIONING_HEADLINE;
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

// ——— Meta ———
export const META_TITLE = `${NAME} | ${JOB_TITLE}`;
export const META_SITE_URL = 'https://www.abhisheknairofficial.com';
