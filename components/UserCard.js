import Image from 'next/image';

const UserCard = ({ name, image }) => {
  return (
    <div className="flex items-center border-t-2 border-gray-300 pt-4 justify-center">
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <Image
          src={`https:${image.fields.file.url}`}
          width={image.fields.file.details.image.width}
          height={image.fields.file.details.image.height}
        />
      </div>
      <div className="flex flex-col ml-4 ">
        <span className="text-gray-500 font-medium uppercase">Written By</span>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default UserCard;
