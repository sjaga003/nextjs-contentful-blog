import { DuplicateIcon, CheckIcon } from '@heroicons/react/outline';
import { MailIcon } from '@heroicons/react/solid';
import { useState } from 'react';

const ShareScreen = ({ shareScreenData, setShareScreenData }) => {
  const [copiedPressed, setCopiedPressed] = useState(false);

  return (
    <div
      onClick={(e) => {
        if (e.target.id === 'shareScreenBackground') {
          setShareScreenData({ isActive: false, title: '', slug: '' });
        }
      }}
      id="shareScreenBackground"
      className="fixed flex flex-col justify-center items-center top-0 bg-opacity-60 bg-gray-800 h-full w-full "
    >
      <div className="w-5/6 h-1/2 opacity-100 bg-white rounded-lg shadow-md flex flex-col items-center justify-center max-w-xl">
        <div className="flex mb-10 space-x-2">
          {/* button container */}
          <div
            onClick={() =>
              window.open(
                //TODO NEED TO CHANGE THIS TO ACTUALLY SHARE THE RIGHT PAGE
                `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.suhasjagannath.com%2F&amp;src=sdkpreparse`,
                'name',
                'width=600,height=600'
              )
            }
            className="bg-gray-300 p-2.5 h-16 w-16 rounded-full share-button group cursor-pointer flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8 w-8 fill-current text-gray-800 group-hover:text-blue-500 m-0 inline"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </div>
          <div
            onClick={() =>
              window.open(
                //TODO NEED TO CHANGE THIS TO ACTUALLY SHARE THE RIGHT PAGE
                `https://www.twitter.com/share?url=https://www.suhasjagannath.com&text=${shareScreenData.title}`,
                'name',
                'width=600,height=600'
              )
            }
            className="bg-gray-300 p-2.5 h-16 w-16 rounded-full share-button group cursor-pointer flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 fill-current text-gray-800 group-hover:text-blue-500 m-0 inline"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </div>
          <a
            href={`mailto:?subject=Check Out This Article&body=${shareScreenData.title} localhost:3000/posts/${shareScreenData.slug}`}
            className="bg-gray-300 p-2.5 h-16 w-16 rounded-full share-button group cursor-pointer flex items-center justify-center"
          >
            <MailIcon className="text-gray-800  group-hover:text-blue-500 " />
          </a>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(
              `localhost:3000/posts/${shareScreenData.slug}`
            );
            setCopiedPressed(true);
          }}
          className="flex w-35 p-2.5 h-12 bg-gray-300 rounded-lg items-center justify-around group "
        >
          {copiedPressed ? (
            <CheckIcon className="text-gray-800 h-5 w-5  group-hover:text-blue-500" />
          ) : (
            <DuplicateIcon className="text-gray-800 h-5 w-5  group-hover:text-blue-500" />
          )}
          <span className="text-lg group-hover:text-blue-500 font-medium pl-4">
            {' '}
            {copiedPressed ? `Copied` : `Copy Link`}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ShareScreen;
