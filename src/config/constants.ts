/* eslint-disable max-lines -- consolidated site copy; keep all strings in this file */
/**
 * Site copy — single place to edit user-visible text and structured content.
 */

// ——— Identity ———
export const NAME = 'Abhishek Panthalingal';
export const LOCATION = 'Bellevue, WA';
/** Single-line role title (schema, OG, footer one-liners, etc.) */
export const JOB_TITLE = 'Frontend Architect';

// ——— Navigation ———
export const NAV_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Clients', href: '/#clients' },
  { label: 'Contact', href: '/#contact' },
] as const;

/** Landmark label for the primary `<nav>` (accessibility). */
export const NAVIGATION_LANDMARK_LABEL = 'Primary';
export const BRAND_BACK_TO_MAIN_SUFFIX = ', back to main content';
export const BRAND_HOME_HREF = '/#main';

export function brandBackToMainAriaLabel(personName: string): string {
  return `${personName}${BRAND_BACK_TO_MAIN_SUFFIX}`;
}

export const RESUME_URL = '/resume.pdf';
export const RESUME_BUTTON_LABEL = 'Resume';
export const DOWNLOAD_RESUME_LABEL = 'Download Resume';

export const MOBILE_MENU_OPEN_LABEL = 'Open menu';
export const MOBILE_MENU_CLOSE_LABEL = 'Close menu';
export const MOBILE_SITE_MENU_DIALOG_LABEL = 'Site menu';

// ——— Layout & shell ———
export const SKIP_TO_MAIN_LABEL = 'Skip to main content';

export const PRIMARY_LINK_CLASSNAME =
  'inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest '
  + 'bg-primary text-primary-foreground px-5 py-3 transition-colors hover:bg-primary/90';

export const SECONDARY_LINK_CLASSNAME =
  'inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest '
  + 'border border-input px-5 py-3 text-foreground transition-colors '
  + 'hover:border-primary hover:text-primary';

// ——— Spotify (footer) ———
export const STATUS_LISTENING = 'Currently listening to';
export const STATUS_RECENT = 'Recently played';
export const STATUS_NOTHING = 'Nothing playing';
export const SPOTIFY_STATUS_BEFORE_TRACK = ': ';
export const SPOTIFY_API_PATH = '/api/spotify';

// ——— Social ———
export const SOCIAL_LINKS = [
  {
    url: 'https://linkedin.com/in/6foot4',
    label: 'LinkedIn',
  },
  {
    url: 'https://github.com/abhisheknairofficial',
    label: 'GitHub',
  },
];

export function socialProfileLinkAriaLabel(networkLabel: string): string {
  return `Visit ${networkLabel} profile (opens in new tab)`;
}

// ——— Hero (proposed positioning; pending owner confirmation) ———
/* eslint-disable no-warning-comments -- proposed copy pending owner confirmation */

// TODO(owner): confirm
export const HERO_HEADLINE =
  'Engineering leader & frontend architect for real-world systems: POS, devices, enterprise web';

// TODO(owner): confirm
export const HERO_SPECIALTY_MFE = 'Micro-frontends and module federation';

// TODO(owner): confirm
export const HERO_SPECIALTY_RN = 'Cross-platform React Native';

// TODO(owner): confirm
export const HERO_SPECIALTY_SYSTEMS = 'POS, devices, and enterprise web';

export const HERO_SPECIALTIES = [
  HERO_SPECIALTY_MFE,
  HERO_SPECIALTY_RN,
  HERO_SPECIALTY_SYSTEMS,
] as const;

// TODO(owner): confirm
export const HERO_AVAILABILITY = 'Open to Director / Principal roles and advisory.';

// TODO(owner): confirm
export const SELECTED_WORK_TITLE = 'Selected work';

/* eslint-enable no-warning-comments */

export const HERO_TITLE = 'Frontend Architect\n& Engineer';
export const HERO_TAGLINE =
  'Frontend | Mobile | Hardware | Systems';
export const HERO_SCROLL_LABEL = 'Scroll';

// ——— About ———
export const ABOUT_TITLE = 'About';
export const ABOUT_SECTION_NUMBER = '01';
export const ABOUT_TEXT =
  "I'm a systems-focused engineer and architect based in Bellevue, WA. I specialize in building reliable, scalable applications that operate beyond the browser - integrating hardware, networks, and real-world workflows. My work spans frontend architecture, device communication, and end-to-end system design.";
export const ABOUT_TEXT_2 =
  'At Rhombuz LLC, I architect and deliver production systems for enterprise clients, lead cross-functional teams, and establish engineering standards across products. I focus on making complex systems work reliably in real-world environments';

export const QUICK_FACTS = [
  { number: '01', label: 'Experience', value: '8+ years building production systems' },
  { number: '02', label: 'Specialization', value: 'Mobile, Web, Cloud' },
  { number: '03', label: 'Current Role', value: 'Senior Product Technologist @ Rhombuz LLC' },
  { number: '04', label: 'Focus', value: 'Real-world systems (POS, devices, networks)' },
];

// ——— Experience ———
export const EXPERIENCE_TITLE = 'Experience';
export const EXPERIENCE_SECTION_NUMBER = '02';

export const TIMELINE_DATA = [
  {
    id: 5,
    period: 'Apr 2025 — Present',
    company: 'Rhombuz LLC',
    role: 'Senior Product Technologist',
    description:
      'Architecting and leading frontend development for large-scale enterprise applications. Establishing best practices in React.js, React Native, TypeScript, and state management across multiple product lines.',
    highlights: [
      'Architected micro-frontend system reducing initial load time by 40%',
      'Led migration from legacy Windows applications to modern React Native stack',
      'Implemented CI/CD pipeline improving deployment frequency by 60%',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'React Native', 'Azure'],
  },
  {
    id: 4,
    period: 'Sep 2017 — Mar 2025',
    company: 'UST Global',
    role: 'Lead II — Software Engineering',
    description:
      'Led frontend architecture and development for enterprise-scale applications serving Fortune 500 clients. Mentored a team of 8 engineers and established best practices for React.js development.',
    highlights: [
      'Broke down monolithic codebase into modular architecture, improving maintainability and deploy velocity',
      'Created component system yielding 20% reduction in development time for new features',
      'Improved application performance by 33% for 15,000+ daily active users',
    ],
    technologies: ['React', 'React Native', 'GraphQL', 'TypeScript', 'AWS', 'Docker'],
  },
];

// ——— Work / Projects ———
export const WORK_TITLE = 'Work';
export const WORK_SECTION_NUMBER = '03';
export const WORK_INDEX_DIGITS = 2;

export type CaseStudyDiagramKind =
  | 'federation'
  | 'windows-to-rn'
  | 'tool-consolidation';

export interface Project {
  slug: string;
  title: string;
  client?: string;
  summary: string;
  role: string;
  technologies: string[];
  outcomes: string[];
  link?: string;
  github?: string;
}

export interface CaseStudySectionCopy {
  constraints: string | null;
  approach: string | null;
  diagram: CaseStudyDiagramKind | null;
  diagramCaption: string | null;
  roleDetail: string | null;
  lessons: string | null;
}

export function projectExternalLinkAriaLabel(projectTitle: string): string {
  return `View ${projectTitle} (opens in new tab)`;
}

export function projectCaseStudyAriaLabel(projectTitle: string): string {
  return `Read case study: ${projectTitle}`;
}

export const PROJECTS: Project[] = [
  {
    slug: 'micro-frontend-platform',
    title: 'Micro-Frontend Platform',
    client: 'Rhombuz LLC',
    summary:
      'Architected a module-federated micro-frontend system enabling independent team deployments across a large enterprise product suite.',
    role: 'Lead Architect',
    technologies: ['React', 'Module Federation', 'TypeScript', 'Azure DevOps'],
    outcomes: ['40% reduction in initial load time', 'Independent team deployments with zero downtime'],
  },
  {
    slug: 'item-pod',
    title: 'Item POD',
    client: 'Albertsons',
    summary:
      'Built a high-performance product operations dashboard for one of the largest grocery chains in the US, handling real-time inventory and pricing data.',
    role: 'Frontend Lead',
    technologies: ['React', 'Redux', 'GraphQL', 'Node.js'],
    outcomes: ['Real-time data for 2,000+ stores', 'Sub-second query response times'],
  },
  {
    slug: 'digital-orders-dashboard',
    title: 'Digital Orders Dashboard',
    client: 'T-Mobile',
    summary:
      'Designed and built an interactive analytics dashboard for digital order tracking with complex D3 visualizations and drill-down capabilities.',
    role: 'Frontend Lead',
    technologies: ['React', 'D3.js', 'TypeScript', 'REST APIs'],
    outcomes: ['Consolidated 5 legacy tools into one platform', '15,000+ daily active users'],
  },
  {
    slug: 'react-native-migration',
    title: 'React Native Migration',
    client: 'Enterprise Client',
    summary:
      'Led the migration of legacy Windows desktop applications to a cross-platform React Native solution, enabling mobile-first workflows for field teams.',
    role: 'Lead Architect',
    technologies: ['React Native', 'TypeScript', 'Azure', 'CI/CD'],
    outcomes: ['Cross-platform coverage (iOS, Android, Windows)', '60% improvement in deployment frequency'],
  },
];

export const SELECTED_WORK_SLUGS = [
  'micro-frontend-platform',
  'react-native-migration',
  'digital-orders-dashboard',
] as const;

export type SelectedWorkSlug = (typeof SELECTED_WORK_SLUGS)[number];

export const CASE_STUDY_SECTIONS: Record<SelectedWorkSlug, CaseStudySectionCopy> = {
  'micro-frontend-platform': {
    constraints: null,
    approach:
      'A module-federated micro-frontend system enabling independent team deployments across a large enterprise product suite. Stack: React, Module Federation, TypeScript, Azure DevOps.',
    diagram: 'federation',
    diagramCaption: 'Placeholder: module federation across an enterprise product suite.',
    roleDetail: null,
    lessons: null,
  },
  'react-native-migration': {
    constraints:
      'Legacy Windows desktop applications. The stated aim was mobile-first workflows for field teams.',
    approach:
      'Migration from legacy Windows desktop applications to a cross-platform React Native solution covering iOS, Android, and Windows, with Azure and CI/CD.',
    diagram: 'windows-to-rn',
    diagramCaption: 'Placeholder: Windows desktop to React Native (iOS, Android, Windows).',
    roleDetail: null,
    lessons: null,
  },
  'digital-orders-dashboard': {
    constraints: null,
    approach:
      'An interactive analytics dashboard for digital order tracking, with D3 visualizations and drill-down capabilities. Stack: React, D3.js, TypeScript, REST APIs.',
    diagram: 'tool-consolidation',
    diagramCaption: 'Placeholder: five legacy tools consolidated into one dashboard.',
    roleDetail: null,
    lessons: null,
  },
};

export const CASE_STUDY_CONTEXT_TITLE = 'Context';
export const CASE_STUDY_CONSTRAINTS_TITLE = 'Constraints';
export const CASE_STUDY_APPROACH_TITLE = 'Approach / architecture';
export const CASE_STUDY_ROLE_TITLE = 'My role';
export const CASE_STUDY_OUTCOMES_TITLE = 'Outcomes';
export const CASE_STUDY_LESSONS_TITLE = 'Lessons';
export const CASE_STUDY_DRAFT_NOTE = 'Draft: detail to add';
export const CASE_STUDY_PREV_LABEL = 'Previous';
export const CASE_STUDY_NEXT_LABEL = 'Next';
export const CASE_STUDY_BACK_TO_WORK = 'Back to selected work';
export const CASE_STUDY_OG_KICKER = 'Case study';

export const SITEMAP_HOME_PRIORITY = 1;
export const SITEMAP_WORK_PRIORITY = 0.8;

// ——— Skills ———
export const SKILLS_TITLE = 'Skills';
export const SKILLS_SECTION_NUMBER = '04';

export const SKILL_PROPOSITIONS = [
  {
    title: 'Systems Architecture',
    description: 'I design frontend systems that scale — micro-frontends, module federation, and component architectures for large teams.',
  },
  {
    title: 'Technical Leadership',
    description: 'I lead engineering teams, establish best practices, run code reviews, and mentor engineers from junior to senior.',
  },
  {
    title: 'Performance Engineering',
    description: 'I optimize what matters — Core Web Vitals, bundle sizes, rendering pipelines, and perceived performance.',
  },
];

export const SKILL_CATEGORIES = [
  {
    title: 'Engineering',
    skills: [
      'React.js & Next.js',
      'TypeScript',
      'React Native',
      'GraphQL & REST',
      'Node.js',
      'AWS & Azure',
      'Docker & CI/CD',
      'Testing (Jest, Playwright)',
    ],
  },
  {
    title: 'Architecture',
    skills: [
      'Micro-frontends',
      'System Design',
      'Performance Optimization',
      'State Management',
      'Design Systems',
      'Module Federation',
      'Progressive Web Apps',
      'Serverless',
    ],
  },
  {
    title: 'Leadership',
    skills: [
      'Team Management',
      'Code Reviews',
      'Mentoring',
      'Agile / Scrum',
      'Technical Writing',
      'Stakeholder Comms',
      'Project Planning',
      'Cross-functional Collaboration',
    ],
  },
];

// ——— Clients ———
export const CLIENTS_TITLE = 'Clients';
export const CLIENTS_SECTION_NUMBER = '05';

export const CLIENTS_DATA = [
  { name: 'T-Mobile', context: 'Telecom analytics' },
  { name: 'Comcast', context: 'Media platform' },
  { name: 'Albertsons', context: 'Retail operations' },
  { name: 'ADP', context: 'HR technology' },
  { name: 'TOMRA', context: 'Reverse vending' },
];

export const CLIENTS_MARQUEE_PAUSE = 'Pause';
export const CLIENTS_MARQUEE_PLAY = 'Play';
export const CLIENTS_MARQUEE_TOGGLE_SUFFIX = ' client list';

// ——— Contact ———
export const CONTACT_TITLE = 'Get in Touch';
export const CONTACT_SECTION_NUMBER = '06';
export const CONTACT_TEXT =
  "I'm always interested in hearing about new opportunities, architecture challenges, and exciting projects. Let's talk.";
export const CONTACT_EMAIL = 'abhisheknr4@gmail.com';

// ——— Footer ———
export const FOOTER_BIO = `${JOB_TITLE} building scalable frontend systems.`;
export const FOOTER_NAV_HEADING = 'Navigation';
export const FOOTER_CONNECT_HEADING = 'Connect';
export const FOOTER_COPYRIGHT = 'Crafted with Next.js, Tailwind, and too much coffee.';

// ——— Theme / accent UI ———
export const THEME_ARIA_LIGHT = 'Switch to light mode';
export const THEME_ARIA_DARK = 'Switch to dark mode';
export const ACCENT_COLOR_ARIA_LABEL = 'Customize accent color';
export const ACCENT_HUE_LABEL = 'Accent hue';
export const ACCENT_HUE_RESET = 'Reset';

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
export const OG_IMAGE_KICKER = 'Portfolio';
export const OG_IMAGE_TAGLINE = `${JOB_TITLE} — frontend systems at scale`;
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_BG = '#0a0a0a';
export const OG_IMAGE_KICKER_COLOR = '#f59e0b';
export const OG_IMAGE_TITLE_COLOR = '#fafaf9';
export const OG_IMAGE_TAGLINE_COLOR = 'rgba(250, 250, 249, 0.65)';
export const OG_IMAGE_PADDING_PX = 72;
export const OG_IMAGE_KICKER_SIZE_PX = 22;
export const OG_IMAGE_TITLE_SIZE_PX = 68;
export const OG_IMAGE_TITLE_FONT_WEIGHT = 400;
export const OG_IMAGE_TAGLINE_SIZE_PX = 30;
export const OG_IMAGE_KICKER_TRACKING = '0.35em';
export const OG_IMAGE_KICKER_MARGIN_PX = 24;
export const OG_IMAGE_TITLE_MARGIN_PX = 20;
export const OG_IMAGE_TAGLINE_MAX_WIDTH_PX = 900;
export const OG_IMAGE_TITLE_LINE_HEIGHT = 1.05;
export const OG_IMAGE_TAGLINE_LINE_HEIGHT = 1.35;
export const OG_IMAGE_FONT_FAMILY = 'ui-sans-serif, system-ui, sans-serif';

// ——— Meta ———
export const META_TITLE = `${NAME} | ${JOB_TITLE}`;
export const META_DESCRIPTION =
  `Portfolio of ${NAME} — ${JOB_TITLE} with 8+ years building React, Next.js, and enterprise-scale frontend systems.`;
export const META_SITE_URL = 'https://www.abhisheknairofficial.com';
