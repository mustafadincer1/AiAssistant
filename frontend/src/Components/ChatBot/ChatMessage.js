import React from 'react';


function ChatMessage({ message, isSender }) {
  return (
    <div className={`flex mb-4 cursor-pointer ${isSender ? 'justify-end' : ''}`}>
      {!isSender && (
        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
          <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
        </div>
      )}
      <div className={`flex max-w-96 ${isSender ? 'bg-gray-600 text-white' : 'bg-white text-gray-700'} rounded-lg p-3 gap-3`}>
        <p>{message}</p>
      </div>
      {isSender && (
        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
          <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
        </div>
      )}
    </div>
  );
}
export default ChatMessage;
