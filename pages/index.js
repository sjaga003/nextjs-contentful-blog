import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import BlogCard from '../components/BlogCard';
import { useState } from 'react';
import ShareScreen from '../components/ShareScreen';

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
  const [shareScreenData, setShareScreenData] = useState({
    isActive: false,
    title: '',
    slug: '',
  });

  console.log(posts);
  return (
    <div className="flex flex-col justify-center items-center">
      {posts
        .map((post) => {
          const { title, slug, content, authorData } = post.fields;
          return (
            <BlogCard
              key={post.sys.id}
              title={title}
              slug={slug}
              authorData={authorData}
              createdAt={post.sys.createdAt}
              content={content}
              setShareScreenData={setShareScreenData}
            />
          );
        })
        .sort((a, b) => {
          return new Date(b.props.createdAt) - new Date(a.props.createdAt);
        })}
      {shareScreenData.isActive && (
        <ShareScreen
          setShareScreenData={setShareScreenData}
          shareScreenData={shareScreenData}
        />
      )}
    </div>
  );
}
