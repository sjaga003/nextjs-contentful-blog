import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import BlogCard from '../components/BlogCard';

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
  console.log(posts);
  return (
    <div>
      {posts
        .map((post) => {
          const { title, userImage, slug, author, content } = post.fields;
          return (
            <BlogCard
              key={post.sys.id}
              title={title}
              userImage={userImage}
              slug={slug}
              author={author}
              createdAt={post.sys.createdAt}
              content={content}
            />
          );
        })
        .sort((a, b) => {
          return new Date(b.props.createdAt) - new Date(a.props.createdAt);
        })}
    </div>
  );
}
