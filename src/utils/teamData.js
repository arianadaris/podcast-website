"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamMemberBySlug = exports.teamData = void 0;
exports.teamData = {
    'maxx': {
        id: '1',
        name: 'Maxx',
        role: 'Host & Producer',
        slug: 'maxx',
        avatar: '/team/maxx.jpg',
        bio: 'Maxx is the founder and lead host of 808s & Coldtakes. With a passion for music production and an ear for emerging talent, he brings technical expertise and industry insights to every episode. His journey in music began as a bedroom producer, evolving into a respected voice in the Arizona hip-hop scene.',
        favoriteArtists: ['Kendrick Lamar', 'J. Cole', 'Drake', 'Travis Scott'],
        favoriteAlbums: [
            'To Pimp A Butterfly - Kendrick Lamar',
            '2014 Forest Hills Drive - J. Cole',
            'Take Care - Drake'
        ],
        socialLinks: {
            twitter: 'https://twitter.com/maxx',
            instagram: 'https://instagram.com/maxx',
            spotify: 'https://open.spotify.com/user/maxx'
        },
        featuredEpisodes: [
            {
                title: 'The Evolution of Production in Hip Hop',
                link: '/episodes/evolution-production-hiphop',
                description: 'Deep dive into how production has evolved in hip hop over the decades.'
            },
            {
                title: 'Breaking Down Drake\'s Sound',
                link: '/episodes/drake-sound-analysis',
                description: 'Technical analysis of Drake\'s signature sound and production style.'
            }
        ],
        quote: "Music is more than just sound - it's a story, a feeling, a moment in time."
    },
    'los': {
        id: '2',
        name: 'Los',
        role: 'Co-Host & Music Analyst',
        slug: 'los',
        avatar: '/team/los.jpg',
        bio: 'Los brings a unique perspective to 808s & Coldtakes, combining his deep knowledge of music theory with street-level understanding of hip-hop culture. His analytical approach to breaking down songs and albums has become a fan favorite segment of the show.',
        favoriteArtists: ['Kanye West', 'Tyler, The Creator', 'Frank Ocean', 'Kid Cudi'],
        favoriteAlbums: [
            'My Beautiful Dark Twisted Fantasy - Kanye West',
            'Igor - Tyler, The Creator',
            'Man On The Moon - Kid Cudi'
        ],
        socialLinks: {
            twitter: 'https://twitter.com/los',
            instagram: 'https://instagram.com/los'
        },
        featuredEpisodes: [
            {
                title: 'Deconstructing Kanye\'s Masterpiece',
                link: '/episodes/kanye-mbdtf-analysis',
                description: 'A deep dive into the musical complexity of My Beautiful Dark Twisted Fantasy.'
            }
        ],
        quote: "Every beat tells a story, you just need to know how to listen."
    },
    // Add other team members similarly...
};
// Helper function to get member by slug
var getTeamMemberBySlug = function (slug) {
    return exports.teamData[slug];
};
exports.getTeamMemberBySlug = getTeamMemberBySlug;
