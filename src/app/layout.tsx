import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Playfair_Display, Special_Elite as SpecialElite } from 'next/font/google';
import './globals.css';

const playfairDisplay = Playfair_Display({
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
  title: 'Abhishek | Software Engineer',
  description: 'Portfolio website showcasing my experience, skills, and projects as a full stack developer',
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
