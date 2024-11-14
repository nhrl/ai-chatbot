import React, { useState, useEffect } from 'react';
import aiImage from '../assets/DALLE_2024-09-24_20.44.48_-_A_frontal_view_of_a_blue-themed_cat_bot_chatbot_mascot._The_design_features_a_sleek_robotic_cat_with_glowing_blue_eyes_triangular_ears_and_a_smooth.webp';
import { GoMoon } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

const Navbar: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const switchTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className='flex transition-all duration-300 bg-white dark:bg-gray-900 border-b border-gray-500 pt-2 pb-2'>
            <div className='flex flex-1 items-center px-5'>
                <img src={aiImage} alt="AI Image" className='h-16' />
                <h2 className='font-jersey text-5xl px-2 dark:text-white'>COMPAI</h2>
            </div>
            <div className='flex flex-1 justify-end px-5 items-center'>
                {theme === "dark" ? (
                    <FiSun
                        size={30}
                        className='mx-8 cursor-pointer text-white'
                        onClick={switchTheme}
                    />
                ) : (
                    <GoMoon
                        size={30}
                        className='mx-8 cursor-pointer text-black'
                        onClick={switchTheme}
                    />
                )}
                <FaRegUser size={25} className='mx-5 cursor-pointer text-black dark:text-white' />
            </div>
        </div>
    );
}

export default Navbar;
