import React, { useState } from 'react';
import '../App.css';
import Sidebar from './Sidebar';
import { RiMenuUnfold3Line2 } from "react-icons/ri";

function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} chats={chats} />

      {/* Main Content */}
      <div className={`dark:bg-gray-900 flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
        {/* Toggle button for smaller screens */}
        {!isSidebarOpen && (
          <div>
            <RiMenuUnfold3Line2
              size={35}
              className="cursor-pointer dark:text-white m-4"
              title="Open Sidebar"
              onClick={toggleSidebar}
            />
          </div>
        )}

        {/* Message container */}
        <div className="p-4 dark:text-white">
          Message container here
        </div>
      </div>
    </div>
  );
}

export default Main;
