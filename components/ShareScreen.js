import { DuplicateIcon, EyeIcon } from '@heroicons/react/outline';

const ShareScreen = ({ shareScreenOpen, setShareScreenOpen }) => {
  return (
    <div
      onClick={(e) => {
        if (e.target.id === 'shareScreenBackground') {
          setShareScreenOpen('');
        }
      }}
      id="shareScreenBackground"
      className="fixed flex flex-col justify-center items-center top-0 bg-opacity-60 bg-gray-800 h-full w-full"
    >
      <div className="w-5/6 h-1/2 opacity-100 bg-white rounded-lg shadow-md flex flex-col items-center justify-center ">
        <div className="flex mb-10">
          {/* button container */}
          <div className="bg-gray-300 p-2.5 h-16 w-16 rounded-full share-button group cursor-pointer mx-1">
            <EyeIcon className="text-gray-800  group-hover:text-blue-500 " />
          </div>
          <div className="bg-gray-300 p-2.5 h-16 w-16 rounded-full share-button group cursor-pointer mx-1">
            <EyeIcon className="text-gray-800  group-hover:text-blue-500 " />
          </div>
          <div className="bg-gray-300 p-2.5 h-16 w-16 rounded-full share-button group cursor-pointer mx-1">
            <EyeIcon className="text-gray-800  group-hover:text-blue-500 " />
          </div>
        </div>

        <button
          onClick={() =>
            navigator.clipboard.writeText(
              `localhost:3000/posts/${shareScreenOpen}`
            )
          }
          className="flex w-1/2 p-2.5 h-12 bg-gray-300 rounded-lg items-center justify-around group"
        >
          <DuplicateIcon className="text-gray-800 h-5 w-5  group-hover:text-blue-500 " />
          <span className="text-lg group-hover:text-blue-500 font-medium">
            {' '}
            Copy Link
          </span>
        </button>
      </div>
    </div>
  );
};

export default ShareScreen;
