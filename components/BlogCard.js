import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import Link from 'next/link';
import { ShareIcon } from '@heroicons/react/outline';

const BlogCard = ({ title, userImage, author, slug, content, createdAt }) => {
  const date = new Date(createdAt);
  let blurb = content.content
    .find((arr) => arr.nodeType === 'paragraph')
    .content.map((val) => {
      if (val.nodeType === 'text' && val.value) {
        return val.value;
      }
    })
    .join('');

  return (
    <div className="flex flex-col m-4 border-2 p-4 rounded-lg shadow-sm hover:shadow-md">
      <Link href={`/posts/${slug}`}>
        <span className="font-bold text-xl hover:text-blue-500 cursor-pointer hover:underline mr-auto">
          {title}
        </span>
      </Link>
      <span className="line-clamp-4 mt-5 text-gray-700">{blurb}</span>
      <div className="flex mt-5 items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-2 select-none">
            <Image
              draggable={false}
              src={`https:${userImage.fields.file.url}`}
              width={userImage.fields.file.details.image.width}
              height={userImage.fields.file.details.image.height}
            />
          </div>

          <div className="flex flex-col">
            <span className="font-medium">{author}</span>{' '}
            <span className="text-gray-700">{`${date.getDate()} ${date.toLocaleString(
              'default',
              {
                month: 'short',
              }
            )} ${date.getFullYear()}`}</span>
          </div>
        </div>
        <div className="bg-gray-300 p-2.5 rounded-full share-button group cursor-pointer">
          <ShareIcon className="text-gray-800 h=4 w-4 group-hover:text-blue-500 " />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
