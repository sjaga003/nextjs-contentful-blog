import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import UserCard from '../../components/UserCard';

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

const renderOptions = {
  renderNode: {
    [INLINES.EMBEDDED_ENTRY]: (node, children) => {
      // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === 'blogPost') {
        return (
          <a href={`/blog/${node.data.target.fields.slug}`}>
            {' '}
            {node.data.target.fields.title}
          </a>
        );
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === 'codeBlock') {
        return (
          <pre>
            <code>{node.data.target.fields.code}</code>
          </pre>
        );
      }

      if (node.data.target.sys.contentType.sys.id === 'videoEmbed') {
        return (
          <iframe
            src={node.data.target.fields.embedUrl}
            height="100%"
            width="100%"
            frameBorder="0"
            scrolling="no"
            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        );
      }
    },

    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      // render the EMBEDDED_ASSET as you need
      return (
        <img
          src={`https://${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.description}
        />
      );
    },
  },
};

const BlogPost = ({ post }) => {
  const { createdAt } = post?.sys;
  const { title, authorData, content } = post?.fields;
  const date = new Date(createdAt);

  return (
    <div className="mx-5">
      <span className="text-4xl font-bold">{title}</span>

      <div className="text-gray-500 text-lg font-normal border-gray-300 border-b-2 mt-2 mb-6">{`${date.toLocaleString(
        'default',
        {
          month: 'long',
        }
      )} ${date.getDate()}, ${date.getFullYear()}`}</div>

      <article className="prose max-w-none prose-blue">
        {documentToReactComponents(content, renderOptions)}
      </article>
      <UserCard authorData={authorData} />
    </div>
  );
};

export default BlogPost;
