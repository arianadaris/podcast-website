import React from 'react';
import { Icon } from '@iconify/react';

interface SocialProps {
    extraClasses: string;
}

const SocialIcons: React.FC<SocialProps> = ({ extraClasses }) => {


    return (
        <div className={`flex flex-row w-fit space-x-4 border-1 border-white/5 px-4 py-2 rounded-full ${extraClasses}`}>
            <a href="/">
                <Icon className="socialIcon" icon="mdi:spotify" />
            </a>
            <a href="/">
                <Icon className="socialIcon" icon="cib:apple-music" />
            </a>
            <a href="/">
                <Icon className="socialIcon" icon="entypo-social:youtube" />
            </a>
        </div>
    );
};

export default SocialIcons;