/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () => {
        return originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });
      };
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {/* {sheet.getStyleElement()} */}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="banner/6foot4-logo.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Hi, I'm abhishek. Welcome to my portfolio site." />
          <link rel="apple-touch-icon" href="banner/6foot4-logo.png" />
          <link rel="manifest" href="manifest.json" />
          <title>Abhishek</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <script async src="/__/firebase/7.5.0/firebase-app.js" />
        <script async src="/__/firebase/7.5.0/firebase-analytics.js" />
        <script async src="/__/firebase/init.js" />
      </Html>
    );
  }
}

export default MyDocument;
