import React from 'react';
import { Icon } from '@iconify/react';

// interface
interface EpisodeProps {
    id: number;
    name: string;
    type: string;
    cover: string;
}

const EpisodeCard:React.FC<EpisodeProps> = ({ id, name, type, cover}) => {
    return (
        <div className="space-y-4">
            <div className="flex-row items-center justify-between space-x-4 cursor-pointer lg:px-8 py-4 rounded-50 lg:hover:border-white/10 lg:border-1 border-transparent hover:bg-white/[1%]">
                <div className="flex-row space-x-4 lg:space-x-8 items-center ">
                    <h2 className="w-1/4">{id < 10 ? "0" + id + "." : id + "."}</h2>
                    <img className="h-[4rem] w-[4rem] lg:h-[6rem] lg:w-[6rem]" src={cover} alt={name} />
                    <div className="space-y-2">
                        <h3 className="line-clamp-2 text-left">{name}</h3>
                        <h4 className="hidden lg:block text-left lg:text-xl">{type}</h4>
                    </div>
                </div>
                <Icon className="hidden lg:block lg:h-[4rem] lg:w-[4rem] p-[0.5px] border-1 border-white/10 rounded-full cursor-pointer hover:scale-105 hover:bg-blue/30" icon="material-symbols:play-circle" />
            </div>
            <div className="h-[1px] w-full bg-white/10"></div>
        </div>
    );
};

export default EpisodeCard;