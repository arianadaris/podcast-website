import React from 'react';
import { Icon } from '@iconify/react';

import Artist from '../assets/images/SAMNX.png';
import ArtistBG from '../assets/images/Artist.png';

import HeroSection from '../components/HeroSection';
import HostCard from '../components/HostCard';

const HomePage: React.FC = () => {

    
    return (
        <>
            {/* Hero Section */}
            <HeroSection /> 

            {/* Meet the Artist */}
            <section className="px-2 lg:px-8">
                <div className="-mt-16 lg:-mt-[10rem] artist-bg h-full w-full lg:flex-row relative py-12 px-8 lg:px-24 rounded-50">
                    <img className="hidden lg:block absolute bottom-0 right-0" src={ArtistBG} alt="S.A.M.N X" />
                    <div className="w-full relative">
                        <img className="lg:h-full lg:w-3/4 mx-auto mb-8 lg:mb-0" src={Artist} alt="S.A.M.N X" />
                    </div>
                    <div className="w-full space-y-6 lg:space-y-12 justify-center relative">
                        <div className="lg:space-y-2">
                            <h4>Meet the Artist</h4>
                            <h2>S.A.M.N X</h2>
                        </div>
                        <p>Local to Arizona, S.A.M.N X is an up-and-coming Hip Hop music group. 808s & Cold-Takes is proud to announce the S.A.M.N X documentary, in partnership with Pascal Productions.</p>
                        <button>
                            <p>Watch Documentary</p>
                            <Icon icon="fluent:arrow-up-right-20-filled" />
                        </button>
                    </div>
                </div>
            </section>

            {/* The Latest Podcast Episodes */}

            {/* Meet the Team */}
            <section className="justify-center items-center space-y-8 lg:pt-16">
                <div className="justify-center items-center space-y-4">
                    <h4>Meet the team</h4>
                    <h1 className="">The 808s Crew</h1>
                </div>
                <p className="lg:w-1/2 lg:mx-auto lg:text-center pb-2 lg:pb-8">Hosts Maxx, Brayden, and Los are talented individuals who make a formidable team committed to helping local artists grow in their communities.</p>
                <button>
                    <h3>About Us</h3>
                    <Icon icon="fluent:arrow-up-right-20-filled" />
                </button>
                <div className="lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 px-4 pt-2 lg:pt-8">
                    <HostCard name="Maxx" />
                    <HostCard name="Brayden" />
                    <HostCard name="Los" />
                </div>
            </section>

            {/* Stay Updated */}
            <section className="px-2 lg:px-8">
                <div className="update-bg py-12 px-8 lg:px-24 rounded-b-50 space-y-12" style={{backgroundPosition: "100% 100%"}}>
                    <div className="space-y-2">
                        <h4>Join our mailing list</h4>
                        <h1>Stay up to date with 808s!</h1>
                    </div>
                    <div className="lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0">
                        <input type="text" name="firstname" placeholder="First Name" />
                        <input type="text" name="email" placeholder="Email" />
                        <button>
                            <p>Join</p>
                            <Icon icon="fluent:arrow-up-right-20-filled" />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;