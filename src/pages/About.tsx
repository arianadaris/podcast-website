import React from 'react';

import HostCard from '../components/HostCard';

const AboutPage: React.FC = () => {

    return (
        <>
            <section className="top-section items-center space-y-8">
                <div className="items-center space-y-4">
                    <h4>Meet the team</h4>
                    <h1>The 808s Crew</h1>
                </div>
                <p className="lg:w-1/2 lg:text-center">Hosts Maxx, Brayden, Los, Mateo and Johan are talented individuals who make a formidable team committed to helping local artists grow in their communities.</p>
                <div className="px-8 lg:px-16  lg:space-y-16">
                    <div className="space-y-8 lg:space-y-0 lg:flex-row lg:space-x-16 justify-between">
                        <HostCard name="Maxx Lopez" />
                        <HostCard name="Brayden Castelhano" />
                        <HostCard name="Los [Last Name]" />
                    </div>
                    <div className="space-y-8 lg:space-y-0 lg:flex-row lg:space-x-16 justify-center lg:px-8">
                        <HostCard name="Mateo Valdez" />
                        <HostCard name="Johan Rodriguez" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutPage;