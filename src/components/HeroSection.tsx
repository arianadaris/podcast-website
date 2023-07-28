import React from 'react';
import { Icon } from '@iconify/react';

import Logo from '../assets/images/Logo_Expanded.png';

import EpisodeCard from '../components/EpisodeCard';

const HeroSection: React.FC = () => {
    return (
        <section className="hero-bg lg:flex-row pb-[7rem] lg:pb-[15rem]">
            <div className="w-full lg:w-1/2 space-y-8 lg:space-y-20">
                <img className="block lg:hidden h-[15rem] w-[15rem] mx-auto" src={Logo} alt="808s Logo" />
                <h1 className="text-4xl lg:text-[7rem] lg:leading-[7rem] lg:scale-y-[115%]">808s &<br></br>Cold-Takes</h1>
                <p>Hosted by Maxx, Los, and Brayden, we cover loads of music topics with an emphasis on Hip Hop. Tune in every weekend to hear our takes and discussions about the music industry!</p>
                <button>
                    <p>Subscribe to Podcast</p>
                    <Icon icon="fluent:arrow-up-right-20-filled" />
                </button>
            </div>
            <div className="w-full lg:w-1/2 space-y-16">
                <img className="hidden lg:block lg:h-[25rem] lg:w-[25rem] mx-auto -my-10" src={Logo} alt="808s Logo" />

                {/* Latest Episodes */}
                <div className="w-3/4 mx-auto space-y-4 lg:h-[24rem] overflow-y-scroll">
                    <h3>Latest Episodes</h3>
                    <EpisodeCard
                        id={1}
                        name="Smino - Luv 4 Rent"
                        type="Album Review"
                        cover="images/EpisodeCover.png"
                    />
                    <EpisodeCard
                        id={2}
                        name="JID - The Forever Story ft. Henry Warwick & Johan Rodriguez"
                        type="Album Review"
                        cover="images/EpisodeCover.png"
                    />
                    <EpisodeCard
                        id={3}
                        name="Smino - Luv 4 Rent"
                        type="Album Review"
                        cover="images/EpisodeCover.png"
                    />
                </div>

            </div>
        </section>
    );
};

export default HeroSection;