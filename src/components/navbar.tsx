import React, { useState, useEffect } from 'react';
import aiImage from '../assets/CATBOT-removebg-preview.png';
import { GoMoon } from 'react-icons/go';
import { FaRegUser } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';
import Login from './login';

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex transition-all duration-300 bg-white dark:bg-gray-900 border-b border-gray-500 pt-2 pb-2 z-50">
        <div className="flex flex-1 items-center px-5">
          <img src={aiImage} alt="AI Image" className="h-16" />
          <h2 className="font-jersey text-5xl px-2 dark:text-white">COMPAI</h2>
        </div>
        <div className="flex flex-1 justify-end px-5 items-center">
          {theme === 'dark' ? (
            <FiSun
              size={30}
              className="mx-8 cursor-pointer text-white"
              onClick={switchTheme}
            />
          ) : (
            <GoMoon
              size={30}
              className="mx-8 cursor-pointer text-black"
              onClick={switchTheme}
            />
          )}
          <FaRegUser
            size={25}
            className="mx-5 cursor-pointer text-black dark:text-white"
            onClick={toggleLogin}
          />
        </div>
      </div>
      {showLogin && <Login onClose={closeLogin} />}
    </>
  );
};

export default Navbar;
