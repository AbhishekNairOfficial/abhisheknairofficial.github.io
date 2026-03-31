import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  DM_Serif_Display as DMSerifDisplay,
  JetBrains_Mono as JetBrainsMono,
  Literata,
  Plus_Jakarta_Sans as PlusJakartaSans,
} from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import {
  META_DESCRIPTION,
  META_SITE_URL,
  META_TITLE,
} from '@/config/constants';

const dmSerifDisplay = DMSerifDisplay({
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
  weight: '400',
});

const literata = Literata({
  subsets: ['latin'],
  variable: '--font-literata',
  weight: ['400', '600', '700'],
});

const plusJakartaSans = PlusJakartaSans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700'],
});

const jetBrainsMono = JetBrainsMono({
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(META_SITE_URL),
  title: META_TITLE,
  description: META_DESCRIPTION,
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: META_SITE_URL,
    siteName: META_TITLE,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
  },
};

const THEME_INIT_SCRIPT = '(function(){try{var t=localStorage.getItem(\'theme\');if(t===\'light\'||t===\'dark\'){document.documentElement.classList.add(t);}else{document.documentElement.classList.add(\'dark\');}}catch(e){document.documentElement.classList.add(\'dark\');}})();';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abhishek Panthalingal',
    jobTitle: 'Lead Engineer & Architect',
    url: META_SITE_URL,
    description: META_DESCRIPTION,
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </head>
      <body
        className={`${dmSerifDisplay.variable} ${literata.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="noise-overlay" />
          <a
            className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:m-0 focus:w-auto focus:h-auto focus:overflow-visible focus:p-4 focus:[clip:auto] focus:whitespace-normal focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            href="#main"
          >
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
