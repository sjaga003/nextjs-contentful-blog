import { createClient } from 'contentful';
import Image from 'next/image';
import { useState } from 'react';
import BlogCard from '../../components/BlogCard';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'blogPostAuthor',
  });

  const paths = res.items.map((item) => {
    return {
      params: {
        slug: item.fields.authorSlug,
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
    content_type: 'blogPostAuthor',
    'fields.authorSlug': params.slug,
  });

  const postList = await client.getEntries({
    content_type: 'blogPost',
    'fields.authorData.fields.authorSlug': params.slug,
    'fields.authorData.sys.contentType.sys.id': 'blogPostAuthor',
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
    props: { authorData: items[0], postList: postList.items },
    revalidate: 1,
  };
};

const UserPage = ({ authorData, postList }) => {
  const { authorSlug, name, profilePicture, userDescription } =
    authorData?.fields;

  console.log(postList);

  const [shareScreenData, setShareScreenData] = useState({
    isActive: false,
    title: '',
    slug: '',
  });

  return (
    <div className="max-w-xl mb-16">
      <section className="flex flex-col sm:flex-row sm:border-b-2 sm:border-gray-300 sm:pb-4 ">
        <div className="sm:pr-6 max-w-sm ">
          <Image
            src={`https:${profilePicture.fields.file.url}`}
            width={profilePicture.fields.file.details.image.width}
            height={profilePicture.fields.file.details.image.height}
          />
        </div>
        <div className="my-6 border-b-2 border-gray-300 pb-4 sm:border-0">
          <div className="text-3xl  font-medium mb-4">About {name}</div>
          <div>{userDescription}</div>
        </div>
      </section>
      <section className="sm:pt-4 flex flex-col">
        {postList
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
      </section>
    </div>
  );
};

export default UserPage;
