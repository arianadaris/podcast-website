import React from 'react';
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import Logo from '../assets/images/Logo.png';

import SocialIcons from '../components/SocialIcons';

const Footer: React.FC = () => {

    
    return (
        <div className="lg:flex-row footer-bg lg:justify-between items-center px-4 lg:px-24 py-4 lg:py-12 space-y-4 lg:space-y-0">
            <h1 className="hidden lg:flex text-3xl w-fit">808s & <br className="hidden lg:block"></br>Cold-Takes</h1>
            <div className="flex lg:hidden flex-row justify-center items-center space-x-6">
                <img className="h-[3rem] w-[3rem]" src={Logo} alt="808s Logo" />
                <h1 className="text-xl text-left">808s &<br></br>Cold-Takes</h1>
            </div>
            {/* Expanded Desktop Navigation */}
            <div className="nav lg:flex-row lg:space-x-8 space-y-2 lg:space-y-0 lg:w-fit h-fit w-full">
                <Link className="navItem border-transparent border-b-1 border-b-white/5 rounded-none lg:rounded-full" to="/about-808s">About</Link>
                <Link className="navItem border-transparent border-b-1 border-b-white/5 rounded-none lg:rounded-full" to="/episodes">Episodes</Link>
                <Link className="navItem border-transparent border-b-1 border-b-white/5 rounded-none lg:rounded-full" to="/artists">Artists</Link>
                <Link className="navItem border-transparent border-b-1 border-b-white/5 rounded-none lg:rounded-full" to="/reviews">Reviews</Link>
                <Link className="navItem border-transparent border-b-1 border-b-white/5 rounded-none lg:rounded-full" to="/contact">Contact Us</Link>
            </div>

            {/* Social Icons */}
            <SocialIcons extraClasses="" />
        </div>
    );
};

export default Footer;