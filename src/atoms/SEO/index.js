import Head from 'next/head';
import React from 'react';

const content = {
  title: 'Hey this is Abhishek! Welcome to my website.',
  description:
    'I’m Abhishek, a developer / designer based out of Bangalore, India. Currently, I work as a Product Engineer at Piktorlabs. I enjoy contributing to user experience and research and that"s where I look to improve my skills. I also enjoy creating interfaces, as well as bringing them to life, on web, android and iOS.',
  keywords: [
    'design',
    'case study',
    'development',
    'coding',
    'react',
    'AbhishekNairOfficial',
    '6foot4',
    'I want a designer',
    'how to build website',
    'abhishek developer',
  ],
  image:
    'https://www.abhisheknairofficial.com/_next/image?url=/aboutMe/profile-picture.jpg&w=1200&q=100',
  url: 'www.abhisheknairofficial.com',
};

const ldJson = {
  '@context': 'http://schema.org/',
  type: 'Person',
  jobTitle: 'Designer | Developer',
  name: 'Abhishek P',
  telephone: '+91 9986551570',
  url: 'http://www.abhisheknairofficial.com',
};

const SEO = () => (
  <Head>
    <title>{content.title}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta property="og:url" content={content.url} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={content.title} />
    <meta property="og:description" content={content.description} />
    <meta property="og:image" content={content.image} />
    <meta name="description" content={content.description} />
    <meta name="keywords" content={content.keywords} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={content.title} />
    <meta name="twitter:description" content={content.description} />
    <meta name="twitter:creator" content="@nairgalactico21" />
    <meta name="twitter:image" content={content.image} />
    <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
  </Head>
);

export default SEO;
