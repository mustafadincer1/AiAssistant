import React, { useState } from "react";

function BxMessageDetail(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2m0 14h-7.277L9 18.233V16H4V4h16z"></path>
      <path fill="currentColor" d="M7 7h10v2H7zm0 4h7v2H7z"></path>
    </svg>
  );
}

function Sidebar({ isOpen, conversations, onSelectConversation, startNewConversation, message }) {
  return (
    isOpen && (
      <aside className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2" style={{ height: '90.5vh' }}>
         <button
          onClick={startNewConversation}
          className="mt-4 p-2 bg-gray-700 text-white rounded hover:bg-blue-700"
        >
          {message}
        </button>
        {conversations.map((conversation, index) => (
          <a
            href="#"
            key={index}
            onClick={() => onSelectConversation(index)}
            className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
          >
            <BxMessageDetail />
            <span>{conversation.title}</span>
          </a>
        ))}
       
      </aside>
    )
  );
}

export default Sidebar;