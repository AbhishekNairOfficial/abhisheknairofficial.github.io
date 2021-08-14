import Head from 'next/head';
import React from 'react';

const content = {
  title: "Abhishek P's portfolio website",
  description:
    'Hey this is Abhishek. Welcome to my portfolio site! You can find more about me and my work here.',
  image:
    'https://www.abhisheknairofficial.com/_next/image?url=/aboutMe/profile-picture.jpg&w=1200&q=100',
  url: 'www.abhisheknairofficial.com',
};

const ldJson = {
  "@context": "http://schema.org/",
  "type": "Person",
  "jobTitle": "Designer | Developer",
  "name": "Abhishek P",
  "telephone": "+91 9986551570",
  "url": "http://www.abhisheknairofficial.com"
}

const SEO = () => (
  <Head>
    <title>Abhishek P</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta property="og:url" content={content.url} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={content.title} />
    <meta property="og:description" content={content.description} />
    <meta property="og:image" content={content.image} />
    <meta name="description" content={content.description} />
    <meta name="keywords" content="design, development, coding" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={content.title} />
    <meta name="twitter:description" content={content.description} />
    <meta name="twitter:creator" content="@nairgalactico21" />
    <meta name="twitter:image" content={content.image} />
    <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
  />
  </Head>
);

export default SEO;
