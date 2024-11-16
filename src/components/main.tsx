import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import Sidebar from './Sidebar';
import { RiMenuUnfold3Line } from 'react-icons/ri';

interface Message {
  id: number;
  sender: string;
  text: string;
  chatId: number;
}

function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState([
    { id: 1, name: 'Chat 1', category: 'Today' },
    { id: 2, name: 'Chat 2', category: 'Yesterday' },
    { id: 3, name: 'Chat 3', category: 'Previous 7 Days' },
  ]);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const allMessages: Message[] = [
    { id: 1, sender: 'AI', text: 'Hello from Chat 1!', chatId: 1 },
    { id: 2, sender: 'User', text: 'How are you?', chatId: 1 },
    { id: 3, sender: 'AI', text: 'Welcome to Chat 2.', chatId: 2 },
    { id: 4, sender: 'User', text: 'Tell me more about React.', chatId: 2 },
    { id: 5, sender: 'AI', text: 'Chat 3 here!', chatId: 3 },
  ];

  
  useEffect(() => {
    if (selectedChatId) {
      setMessages(allMessages.filter((msg) => msg.chatId === selectedChatId));
    }
  }, [selectedChatId]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChatSelect = (chatId: number) => {
    setSelectedChatId(chatId);
    setIsSidebarOpen(false);
  };

  const handleCreateChat = () => {
    const newChatId = chats.length + 1; 
    const newChat = { id: newChatId, name: `Chat ${newChatId}`, category: 'Today' };
    setChats([...chats, newChat]); 
    setSelectedChatId(newChatId); 
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && selectedChatId) {
      const newMsg = {
        id: Date.now(),
        sender: 'User',
        text: newMessage,
        chatId: selectedChatId,
      };

      
      setMessages((prevMessages) => [...prevMessages, newMsg]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative flex h-screen overflow-hidden mt-20">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        chats={chats}
        onChatSelect={handleChatSelect}
        onCreateChat={handleCreateChat}
      />

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
              {selectedChatId ? (
                messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'User' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`${
                          message.sender === 'User'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-300 dark:bg-gray-700 dark:text-white'
                        } max-w-md p-3 rounded-lg shadow-md`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No messages yet in this chat.
                  </p>
                )
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Select a chat to view messages.
                </p>
              )}
            </div>

            {/* Input Section */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={!selectedChatId}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleSendMessage}
                disabled={!selectedChatId}
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
