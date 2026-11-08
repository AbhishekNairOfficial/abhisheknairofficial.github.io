import type { Config } from 'tailwindcss';
import parent from '../../tailwind.config';

const config = {
  ...parent,
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    '../../src/app/molecules/Projects/ProjectSummary.tsx',
  ],
} satisfies Config;

export default config;
