/* eslint-disable react/no-danger */
import React from 'react';

import { getAllPosts, getPostBySlug, markdownToHtml } from 'config/api';

const CaseStudy = props => {
  const { post } = props;
  // debugger;
  // const myMarkdownData = useMarkDown(post.content);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
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
