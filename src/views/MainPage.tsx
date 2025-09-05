import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Avatar,
  Stack,
  IconButton,
  Divider,
} from '@mui/material';
import {
  PlayArrow,
  Headphones,
  Description,
  Email,
  Instagram,
  Twitter,
  YouTube,
  MusicNote,
  Podcasts,
} from '@mui/icons-material';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const links = [
    {
      title: 'Team',
      href: '/team',
      onClick: () => navigate('/team'),
    },
    {
      title: 'Episodes',
      href: '/episodes',
      onClick: () => navigate('/episodes'),
    },
    {
      title: 'Interviews',
      href: '/interviews',
      onClick: () => navigate('/interviews'),
    },
    {
      title: 'Events',
      href: '/events',
      onClick: () => navigate('/events'),
    },
    {
      title: 'Contact',
      href: '/contact',
      onClick: () => navigate('/contact'),
    },
  ];

  const socialLinks = [
    { icon: <Instagram />, href: '#', label: 'Instagram' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <YouTube />, href: '#', label: 'YouTube' },
    { icon: <MusicNote />, href: '#', label: 'Spotify' },
    { icon: <Podcasts />, href: '#', label: 'Apple Podcasts' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth={false} sx={{ 
        maxWidth: { xs: '97vw', sm: '80vw', md: '70vw', lg: '50vw' }, 
        paddingX: 2 
      }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          <Box
            component="img"
            src="/logo.png"
            alt="808s & COLD TAKES Logo"
            onClick={() => navigate('/main')}
            sx={{
              width: 200,
              height: 200,
              margin: '0 auto 16px',
              display: 'block',
              cursor: 'pointer',
            }}
          />
        </Box>

        {/* Main Links */}
        <Stack spacing={2} sx={{ marginBottom: 4, alignItems: 'center' }}>
          {links.map((link, index) => (
            <Typography
              key={index}
              variant="h5"
              component="a"
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                if (link.onClick) {
                  link.onClick();
                }
              }}
              sx={{
                cursor: 'pointer',
                textDecoration: 'underline',
                color: 'black',
                '&:hover': {
                  color: 'rgba(0,0,0,0.75)',
                },
                transition: 'color 0.3s ease',
              }}
            >
              {link.title}
            </Typography>
          ))}
        </Stack>

        {/* Social Links */}
        <Card sx={{ marginBottom: 3, backgroundColor: 'transparent', boxShadow: 'none' }}>
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
      </Container>
    </Box>
  );
};

export default MainPage;
