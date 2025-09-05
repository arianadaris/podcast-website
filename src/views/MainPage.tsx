import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Stack,
} from '@mui/material';
import Socials from '../components/Socials';

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
        <Socials sx={{ marginBottom: 3 }} />
      </Container>
    </Box>
  );
};

export default MainPage;
