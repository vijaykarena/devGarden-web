import { useState } from "react";
import { useParams } from "react-router";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);

  return (
    <div class="w-full p-10">
      <div class="bg-gray-600 shadow-md rounded-lg">
        <div class="p-4 border-b bg-gray-700 text-white rounded-t-lg flex justify-between items-center">
          <p class="text-lg font-semibold">Target User</p>
        </div>
        <div id="chatbox" class="p-4 h-96 overflow-y-auto">
          {/* <!-- Chat messages will be displayed here --> */}
         


          <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">Are you ready?</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">Yes!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
        </div>
        <div class="p-4 border-t flex">
          <input
            id="user-input"
            type="text"
            placeholder="Type a message"
            class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            id="send-button"
            class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
