import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Logo from '../assets/images/Logo.png';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle Mobile Menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <div className="px-2 lg:px-0 fixed z-[100]">
            <div className={`lg:mx-4 my-4 ${isOpen ? "border-none" : "border-1"} border-white/5 lg:border-none py-2 lg:py-5 px-8 lg:px-24 rounded-50 bg-opacity-40 backdrop-blur-2xl backdrop-filter bg-white/[1%]`}>
                <div className="flex-row items-center justify-between ">
                    {/* Logo */}
                    <a href="/">
                        <img className="h-[4rem] w-[4rem] lg:h-[6rem] lg:w-[6rem] rounded-full lg:animate-growShadow" src={Logo} alt="808s & Cold-Takes Logo" />
                    </a>

                    {/* Expanded Desktop Navigation */}
                    <div className="nav hidden lg:flex flex-row space-x-8 w-fit">
                        <a className="navItem" href="/">About</a>
                        <a className="navItem" href="/">Episodes</a>
                        <a className="navItem" href="/">Artists</a>
                        <a className="navItem" href="/">Reviews</a>
                        <a className="navItem" href="/">Contact Us</a>
                    </div>

                    {/* Social Icons */}
                    <div className="hidden lg:flex flex-row w-fit space-x-4 border-1 border-white/5 px-4 py-2 rounded-full">
                        <a  href="/">
                            <Icon className="socialIcon" icon="mdi:spotify" />
                        </a>
                        <a href="/">
                            <Icon className="socialIcon" icon="cib:apple-music" />
                        </a>
                        <a href="/">
                            <Icon className="socialIcon" icon="entypo-social:youtube" />
                        </a>
                    </div>

                    {/* Mobile Hamburger Icon */}
                    <div className="block lg:hidden w-fit">
                        <Icon className="h-[1.5rem] w-[1.5rem]" icon="charm:menu-hamburger" onClick={toggleMenu} />
                    </div>
                </div>
            </div>
            {/* Mobile Menu Dropdown */}
            {
                isOpen && (
                    <div className="items-center justify-center space-y-12 lg:hidden fixed h-screen w-full bg-[#141414] top-0 left-0 animate-openMenu z-100">
                        {/* Close Menu Button */}
                        <Icon className="absolute top-0 right-0 p-4 h-[4rem] w-[4rem]" icon="lucide:x" onClick={toggleMenu} />

                        {/* Nav Links */}
                        <div className="space-y-8 w-full">
                            <a className="navItem" href="/">About</a>
                            <a className="navItem" href="/">Episodes</a>
                            <a className="navItem" href="/">Artists</a>
                            <a className="navItem" href="/">Reviews</a>
                            <a className="navItem" href="/">Contact Us</a>
                        </div>

                        {/* Social Icons */}
                        <div className="flex-row w-fit lg:hidden space-x-4 border-1 border-white/5 px-4 py-2 rounded-full">
                            <a  href="/">
                                <Icon className="socialIcon" icon="mdi:spotify" />
                            </a>
                            <a href="/">
                                <Icon className="socialIcon" icon="cib:apple-music" />
                            </a>
                            <a href="/">
                                <Icon className="socialIcon" icon="entypo-social:youtube" />
                            </a>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Header;