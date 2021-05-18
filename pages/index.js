import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Head from 'next/head';
import Image from 'next/image';

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: 'blogPost' });

  return {
    props: {
      posts: res.items,
    },
    revalidate: 1,
  };
};

export default function Home({ posts }) {
  return (
    <div>
      <span>Blog</span>
      {posts.map((post) => (
        <>
          <div>{post.sys.createdAt}</div>
          <div>{post.fields.title}</div>
          <div>{post.fields.slug}</div>
          <div>{post.fields.author}</div>
          <div>{documentToReactComponents(post.fields.content)}</div>
        </>
      ))}
    </div>
  );
}
