import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

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
      {posts.map((post) => (
        <div key={post.sys.id}>
          <div>{post.sys.createdAt}</div>
          <Link href={`/posts/${post.fields.slug}`}>
            <h3 className="text-blue-700 cursor-pointer">
              {post.fields.title}
            </h3>
          </Link>
          <div>{post.fields.slug}</div>
          <div>{post.fields.author}</div>
          <article className="prose max-w-none prose-blue">
            {documentToReactComponents(post.fields.content)}
          </article>
        </div>
      ))}
    </div>
  );
}
