import React from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  Icon
} from '@iconify/react';

const Socials: React.FC<{ sx?: object }> = ({ sx }) => {
  const socialLinks = [
    { icon: <Icon icon="mdi:instagram" />, href: 'https://www.instagram.com/808sncoldtakes/?hl=en', label: 'Instagram' },
    { icon: <Icon icon="mdi:youtube" />, href: 'https://www.youtube.com/channel/UCPQInFOc1OctuJRIZuEiPGQ', label: 'YouTube' },
    { icon: <Icon icon="cib:tiktok" />, href: 'https://www.tiktok.com/@808sncoldtakes', label: 'TikTok' },
    { icon: <Icon icon="mdi:spotify" />, href: 'https://open.spotify.com/show/2u9VX1Jn4bkQmguXtCQUYj', label: 'Spotify' },
    { icon: <Icon icon="mdi:apple" />, href: 'https://podcasts.apple.com/us/podcast/808s-cold-takes/id1559388318', label: 'Apple Podcasts' },
  ];

  return (
    <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', ...sx }}>
      <CardContent sx={{ padding: 0 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          {socialLinks.map((social, index) => (
            <IconButton
              key={index}
              sx={{
                color: 'black',
                '&:hover': {
                  color: 'rgba(0,0,0,0.75)',
                },
                transition: 'all 0.3s ease',
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& svg': {
                  width: 24,
                  height: 24,
                },
              }}
              onClick={() => window.open(social.href, '_blank')}
              aria-label={social.label}
            >
              {social.icon}
            </IconButton>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Socials;
