import React from 'react';

function ChatInput({ sendMessage, inputMessage, setInputMessage }) {
    return (
      <footer className="border-t border-gray-300 p-4 bg-gray-100 flex justify-center items-center fixed bottom-0 left-0 right-0 ml-64 mr-44">
        <div className="flex items-center w-full max-w-screen-lg mx-auto">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button onClick={sendMessage} className="bg-gray-600 text-white px-4 py-2 rounded-md ml-2">Send</button>
        </div>
      </footer>
    );
  }
export default ChatInput;
