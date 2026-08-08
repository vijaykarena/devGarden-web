import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    socket.on("receivedMessage", ({ firstName, text }) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full flex justify-center p-10">
      <div className="bg-gray-600 shadow-md rounded-lg w-3/4">
        <div className="p-4 border-b bg-gray-700 text-white rounded-t-lg flex justify-between items-center">
          <p className="text-lg font-semibold">Target User</p>
        </div>
        <div id="chatbox" className="p-4 h-96 overflow-y-auto">
          {/* <!-- Chat messages will be displayed here --> */}
          {messages.map((message, index) => (
            <div key={index}>
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
                  {message.firstName}
                  {/* <time className="text-xs opacity-50">12:45</time> */}
                </div>
                <div className="chat-bubble">{message.text}</div>
                {/* <div className="chat-footer opacity-50">Delivered</div> */}
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
          ))}
        </div>
        <div className="p-4 border-t flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
