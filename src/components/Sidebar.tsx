import React from 'react';
import { RiMenuUnfold2Line } from "react-icons/ri";

interface Chat {
  id: number;
  name: string;
  category: string;
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  chats: Chat[];
}

function Sidebar({ isOpen, toggleSidebar, chats }: SidebarProps) {
  // Group chats by category
  const groupedChats = chats.reduce((groups, chat) => {
    if (!groups[chat.category]) {
      groups[chat.category] = [];
    }
    groups[chat.category].push(chat);
    return groups;
  }, {} as { [key: string]: Chat[] });

  return (
    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'} fixed inset-0 bg-gray-800 z-10 w-80 mt-20 h-[calc(100vh-80px)]`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header with Toggle Button */}
        <div className="p-4">
          <RiMenuUnfold2Line 
            size={35} 
            className="mx-2 cursor-pointer text-white" 
            title="Close Sidebar"  
            onClick={toggleSidebar} 
          />
        </div>    

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
          <ul className="space-y-6">
            {Object.keys(groupedChats).map((category) => (
              <li key={category}>
                <h3 className="text-gray-400 text-sm font-semibold mb-2">{category}</h3>
                <ul className="space-y-2">
                  {groupedChats[category].map((chat) => (
                    <li 
                      key={chat.id} 
                      className="bg-gray-700 p-3 rounded text-white cursor-pointer hover:bg-gray-600"
                    >
                      {chat.name}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
