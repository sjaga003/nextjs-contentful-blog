import Image from 'next/image';
import Link from 'next/link';

const UserCard = ({ authorData }) => {
  const { authorSlug, name, profilePicture, userDescription } =
    authorData.fields;
  return (
    <div className="flex items-start border-t-2 border-gray-300 pt-4 my-24">
      <div className="w-1/5 rounded-full overflow-hidden flex ">
        <Image
          src={`https:${profilePicture.fields.file.url}`}
          width={profilePicture.fields.file.details.image.width}
          height={profilePicture.fields.file.details.image.height}
        />
      </div>
      <div className="flex flex-col ml-4 w-4/5">
        <span className="text-gray-500 font-medium uppercase">Written By</span>
        <Link href={`/profile/${authorSlug}`}>
          <span className="font-medium text-xl hover:text-blue-500 cursor-pointer hover:underline">
            {name}
          </span>
        </Link>
        <span className="">{userDescription}</span>
      </div>
    </div>
  );
};

export default UserCard;
