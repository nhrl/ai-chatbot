import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import Sidebar from './Sidebar';
import { RiMenuUnfold3Line } from "react-icons/ri";

function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "AI", text: "Hello! How can I assist you today?" },
    { id: 2, sender: "User", text: "Can you explain how to create a ChatGPT-like UI in React?" },
    { id: 3, sender: "AI", text: "Of course! You can use styled components or CSS frameworks to achieve this." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const chats = [
    { id: 1, name: "Scrollable Sidebar Example", category: "Today" },
    { id: 2, name: "Sidebar className Prop Issue", category: "Today" },
    { id: 3, name: "Dark Mode Icon Styling", category: "Today" },
    { id: 4, name: "Middleware Ideas", category: "Yesterday" },
    { id: 5, name: "Middleware Implementation in Express", category: "Yesterday" },
    { id: 6, name: "Trainer Availability Check", category: "Previous 7 Days" },
    { id: 7, name: "Save Favorites Data", category: "Previous 7 Days" },
    { id: 8, name: "Display Exercise Photo Name", category: "Previous 30 Days" },
    { id: 9, name: "Display Exercise Photo Name", category: "Previous 30 Days" },
    { id: 10, name: "Display Exercise Photo Name", category: "Previous 30 Days" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { id: Date.now(), sender: "User", text: newMessage }]);
      setNewMessage("");
    }
  };

  // Automatically scroll to the bottom when messages are updated
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative flex h-screen overflow-hidden mt-20">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} chats={chats} />

      {/* Sidebar Toggle Icon */}
      {!isSidebarOpen && (
        <div className="absolute top-4 left-4 z-50">
          <RiMenuUnfold3Line
            size={35}
            className="cursor-pointer dark:text-white"
            title="Open Sidebar"
            onClick={toggleSidebar}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow dark:bg-gray-900 transition-all duration-300">
        {/* Message Container */}
        <div className="flex items-center justify-center h-full py-5">
          <div className="w-4/5 h-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col">
            {/* Chat Messages */}
            <div
              ref={messageContainerRef}
              className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "User" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      message.sender === "User"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 dark:bg-gray-700 dark:text-white"
                    } max-w-md p-3 rounded-lg shadow-md`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Section */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
