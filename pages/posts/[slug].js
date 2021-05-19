import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'blogPost',
  });

  const paths = res.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': params.slug,
  });

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { post: items[0] },
    revalidate: 1,
  };
};

const BlogPost = ({ post }) => {
  const { createdAt } = post.sys;
  const { title, slug, author, content } = post.fields;

  return (
    <>
      <div>{createdAt}</div>
      <div>{title}</div>
      <div>{slug}</div>
      <div>{author}</div>
      <div>{documentToReactComponents(content)}</div>
    </>
  );
};

export default BlogPost;
