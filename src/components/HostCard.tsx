import React from 'react';

import { Icon } from '@iconify/react';

interface HostProps {
    name: string;
}

const HostCard: React.FC<HostProps> = ({ name }) => {


    return (
        <div className="space-y-4 bg-purple h-full lg:w-1/3">
            {/* Placeholder Image Div */}
            <div className="h-[23rem] lg:h-[43rem] w-full bg-blue mx-auto"></div>
            <div className="flex-row justify-between items-center">
                <h4>{ name }</h4>
                <Icon icon="fluent:arrow-up-right-20-filled" />
            </div>
            <div className="h-[1px] w-full bg-white/10"></div>
        </div>
    );
};

export default HostCard;