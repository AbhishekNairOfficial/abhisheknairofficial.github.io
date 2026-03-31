/* eslint-disable max-lines -- consolidated site copy; keep all strings in this file */
/**
 * Site copy — single place to edit user-visible text and structured content.
 */

// ——— Identity ———
export const NAME = 'Abhishek Panthalingal';
export const LOCATION = 'Bellevue, WA';
/** Single-line role title (schema, OG, footer one-liners, etc.) */
export const JOB_TITLE = 'Lead Engineer & Architect';

// ——— Navigation ———
export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
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
export const DOWNLOAD_RESUME_LABEL = 'Download Resume';

export const MOBILE_MENU_OPEN_LABEL = 'Open menu';
export const MOBILE_MENU_CLOSE_LABEL = 'Close menu';
export const MOBILE_SITE_MENU_DIALOG_LABEL = 'Site menu';

// ——— Layout & shell ———
export const SKIP_TO_MAIN_LABEL = 'Skip to main content';

// ——— Spotify (footer) ———
export const STATUS_LISTENING = 'Currently listening to';
export const STATUS_RECENT = 'Recently played';
export const STATUS_NOTHING = 'Nothing playing';
export const SPOTIFY_STATUS_BEFORE_TRACK = ': ';

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

// ——— Hero ———
export const HERO_TITLE = 'Lead Engineer\n& Architect';
export const HERO_TAGLINE =
  'I architect frontend systems that scale. 8+ years building enterprise products for T-Mobile, Comcast, and Albertsons.';
export const HERO_SCROLL_LABEL = 'Scroll';

// ——— About ———
export const ABOUT_TITLE = 'About';
export const ABOUT_SECTION_NUMBER = '01';
export const ABOUT_TEXT =
  "I'm a lead engineer and architect based in Bellevue, WA. I specialize in building scalable, user-centric applications — from micro-frontend architectures to React Native migrations. I thrive at the intersection of systems thinking and craft, leading teams to ship products that perform at scale.";
export const ABOUT_TEXT_2 =
  'Currently at Rhombuz LLC, I architect frontend systems for enterprise clients, mentor cross-functional engineering teams, and establish best practices across multiple product lines.';

export const QUICK_FACTS = [
  { number: '01', label: 'Experience', value: '8+ years in software engineering' },
  { number: '02', label: 'Specialization', value: 'Frontend Architecture & Systems Design' },
  { number: '03', label: 'Current Role', value: 'Senior Product Technologist @ Rhombuz LLC' },
  { number: '04', label: 'Location', value: 'Bellevue, Washington' },
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
    id: 3,
    period: 'Mar 2023 — Mar 2025',
    company: 'Independent Consulting',
    role: 'Freelance Architect & Engineer',
    description:
      'Consulted for startups and mid-size companies on frontend architecture, performance optimization, and design system implementation. Delivered production systems across React, Next.js, and React Native.',
    highlights: [
      'Designed and delivered component library adopted by 3 client engineering teams',
      'Reduced Lighthouse performance scores from ~50 to 90+ for an e-commerce platform',
      'Established testing and CI/CD practices for a Series A startup',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js'],
  },
  {
    id: 4,
    period: 'Sep 2017 — Mar 2023',
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

export interface Project {
  title: string;
  client?: string;
  summary: string;
  role: string;
  technologies: string[];
  outcomes: string[];
  link?: string;
  github?: string;
}

export function projectExternalLinkAriaLabel(projectTitle: string): string {
  return `View ${projectTitle} (opens in new tab)`;
}

export const PROJECTS: Project[] = [
  {
    title: 'Micro-Frontend Platform',
    client: 'Rhombuz LLC',
    summary:
      'Architected a module-federated micro-frontend system enabling independent team deployments across a large enterprise product suite.',
    role: 'Lead Architect',
    technologies: ['React', 'Module Federation', 'TypeScript', 'Azure DevOps'],
    outcomes: ['40% reduction in initial load time', 'Independent team deployments with zero downtime'],
  },
  {
    title: 'Item POD',
    client: 'Albertsons',
    summary:
      'Built a high-performance product operations dashboard for one of the largest grocery chains in the US, handling real-time inventory and pricing data.',
    role: 'Frontend Lead',
    technologies: ['React', 'Redux', 'GraphQL', 'Node.js'],
    outcomes: ['Real-time data for 2,000+ stores', 'Sub-second query response times'],
  },
  {
    title: 'Digital Orders Dashboard',
    client: 'T-Mobile',
    summary:
      'Designed and built an interactive analytics dashboard for digital order tracking with complex D3 visualizations and drill-down capabilities.',
    role: 'Frontend Lead',
    technologies: ['React', 'D3.js', 'TypeScript', 'REST APIs'],
    outcomes: ['Consolidated 5 legacy tools into one platform', '15,000+ daily active users'],
  },
  {
    title: 'React Native Migration',
    client: 'Enterprise Client',
    summary:
      'Led the migration of legacy Windows desktop applications to a cross-platform React Native solution, enabling mobile-first workflows for field teams.',
    role: 'Lead Architect',
    technologies: ['React Native', 'TypeScript', 'Azure', 'CI/CD'],
    outcomes: ['Cross-platform coverage (iOS, Android, Windows)', '60% improvement in deployment frequency'],
  },
];

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

// ——— Open Graph image (app/opengraph-image.tsx) ———
export const OG_IMAGE_ALT = `${NAME} — ${JOB_TITLE}`;
export const OG_IMAGE_KICKER = 'Portfolio';
export const OG_IMAGE_TAGLINE = `${JOB_TITLE} — frontend systems at scale`;

// ——— Meta ———
export const META_TITLE = `${NAME} | ${JOB_TITLE}`;
export const META_DESCRIPTION =
  `Portfolio of ${NAME} — ${JOB_TITLE} with 8+ years building React, Next.js, and enterprise-scale frontend systems.`;
export const META_SITE_URL = 'https://abhisheknairofficial.github.io';
