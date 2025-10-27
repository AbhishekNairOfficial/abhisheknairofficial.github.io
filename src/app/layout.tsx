import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Playfair_Display as PlayfairDisplay, Special_Elite as SpecialElite } from 'next/font/google';
import './globals.css';
import { META_DESCRIPTION, META_TITLE } from '@/config/constants';

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
  title: META_TITLE,
  description: META_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${specialEliteFont.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
