import React from 'react';
import { Icon } from '@iconify/react';
import Logo from '../assets/images/Logo.png';

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
                <a className="navItem border-transparent border-b-1 border-b-white/5 rounded-none lg:rounded-full" href="/">About</a>
                <a className="navItem border-transparent border-b-1 border-b-white/5 rounded-none lg:rounded-full" href="/">Episodes</a>
                <a className="navItem border-transparent border-b-1 border-b-white/5 rounded-none lg:rounded-full" href="/">Artists</a>
                <a className="navItem border-transparent border-b-1 border-b-white/5 rounded-none lg:rounded-full" href="/">Reviews</a>
                <a className="navItem border-transparent border-b-1 border-b-white/5 rounded-none lg:rounded-full" href="/">Contact Us</a>
            </div>

            {/* Social Icons */}
            <div className="flex-row w-fit space-x-4 border-1 border-white/5 px-4 py-2 rounded-full">
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
    );
};

export default Footer;