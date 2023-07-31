import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Icon } from '@iconify/react';
import Logo from '../assets/images/Logo.png';

import SocialIcons from '../components/SocialIcons';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle Mobile Menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    var location = useLocation();
    var locationsDict = {
        "About": "/about-808s",
        "Episodes": "/episodes",
        "Artists": "/artists",
        "Reviews": "/reviews",
        "Contact Us": "/contact"
    };
    
    return (
        <div className="px-2 lg:px-0 fixed z-[100]">
            <div className={`lg:mx-4 my-4 ${isOpen ? "border-none" : "border-1"} border-white/5 lg:border-none py-2 lg:py-5 px-8 lg:px-24 rounded-50 bg-opacity-40 backdrop-blur-2xl backdrop-filter bg-white/[1%]`}>
                <div className="flex-row items-center justify-between">
                    {/* Logo */}
                    <a href="/">
                        <img className="h-[4rem] w-[4rem] lg:h-[6rem] lg:w-[6rem] rounded-full lg:animate-growShadow" src={Logo} alt="808s & Cold-Takes Logo" />
                    </a>

                    {/* Expanded Desktop Navigation */}
                    <div className="nav hidden lg:flex flex-row space-x-8 w-fit">
                        {
                            Object.entries(locationsDict).map(([title, url]) => (
                                <Link className={`navItem ${location.pathname === url ? "active" : ""}`} key={title} to={url}>{title}</Link>
                            ))
                        }
                    </div>

                    {/* Social Icons */}
                    <SocialIcons extraClasses="hidden lg:flex" />

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

                        <a href="/">
                            <img className="h-[6rem] w-[6rem] rounded-full" src={Logo} alt="808s & Cold-Takes Logo" />
                        </a>

                        {/* Nav Links */}
                        <div className="space-y-8 w-full">
                        {
                            Object.entries(locationsDict).map(([title, url]) => (
                                <Link className={`navItem ${location.pathname === url ? "active" : ""}`} key={title} to={url} onClick={() => setIsOpen(!isOpen)}>{title}</Link>
                            ))
                        }
                        </div>

                        {/* Social Icons */}
                        <SocialIcons extraClasses="" />
                    </div>
                )
            }
        </div>
    );
};

export default Header;