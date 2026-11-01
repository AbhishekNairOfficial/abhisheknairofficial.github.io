import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  DM_Serif_Display as DMSerifDisplay,
  JetBrains_Mono as JetBrainsMono,
  Plus_Jakarta_Sans as PlusJakartaSans,
} from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/app/organisms/Header';
import Footer from '@/app/organisms/Footer';
import {
  JOB_TITLE,
  META_DESCRIPTION,
  META_SITE_URL,
  META_TITLE,
  NAME,
  OG_IMAGE_ALT,
  OG_IMAGE_SIZE,
  SKIP_TO_MAIN_LABEL,
  SOCIAL_LINKS,
} from '@/config/constants';
import { absoluteUrl } from '@/lib/site';

const dmSerifDisplay = DMSerifDisplay({
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
  weight: '400',
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

const OG_IMAGE_URL = absoluteUrl('/opengraph-image');

export const metadata: Metadata = {
  metadataBase: new URL(META_SITE_URL),
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: META_SITE_URL,
    siteName: META_TITLE,
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: OG_IMAGE_SIZE.width,
        height: OG_IMAGE_SIZE.height,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [OG_IMAGE_URL],
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
    name: NAME,
    jobTitle: JOB_TITLE,
    url: META_SITE_URL,
    image: absoluteUrl('/images/profile-picture.jpg'),
    description: META_DESCRIPTION,
    sameAs: SOCIAL_LINKS.map((link) => {
      return link.url;
    }),
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
        className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="noise-overlay" />
          <a
            className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:m-0 focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-normal focus:p-4 focus:[clip:auto] focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:m-0 focus-visible:h-auto focus-visible:w-auto focus-visible:overflow-visible focus-visible:whitespace-normal focus-visible:p-4 focus-visible:[clip:auto] focus-visible:bg-primary focus-visible:text-primary-foreground"
            href="#main"
          >
            {SKIP_TO_MAIN_LABEL}
          </a>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
