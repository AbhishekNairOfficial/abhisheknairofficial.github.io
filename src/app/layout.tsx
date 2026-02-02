import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Playfair_Display as PlayfairDisplay, Special_Elite as SpecialElite } from 'next/font/google';
import './globals.css';
import {
  META_DESCRIPTION,
  META_OG_IMAGE,
  META_SITE_URL,
  META_TITLE,
} from '@/config/constants';

const playfairDisplay = PlayfairDisplay({
  weight: '400',
  variable: '--font-playfair-display',
  subsets: ['latin'],
});

const specialEliteFont = SpecialElite({
  weight: '400',
  variable: '--font-special-elite',
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
    images: [{ url: META_OG_IMAGE, width: 1200, height: 630, alt: 'Abhishek Panthalingal' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [META_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abhishek Panthalingal',
    jobTitle: 'Senior Product Technologist',
    url: META_SITE_URL,
    description: META_DESCRIPTION,
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${specialEliteFont.variable} ${playfairDisplay.variable} antialiased`}
      >
        <a
          className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:m-0 focus:w-auto focus:h-auto focus:overflow-visible focus:p-4 focus:[clip:auto] focus:whitespace-normal focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
          href="#main"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
