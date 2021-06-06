/* eslint-disable react/no-danger */
import React from 'react';
import Head from 'next/head';

import SixFootFour from 'atoms/6foot4';
import { getAllPosts, getPostBySlug, markdownToHtml } from 'config/api';

import styles from './index.module.css';

const CaseStudy = props => {
  const { post } = props;

  return (
    <>
      <Head>
        <title>{post.slug}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SixFootFour />
      <div className={styles.container} dangerouslySetInnerHTML={{ __html: post.content }} />
    </>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export default CaseStudy;
