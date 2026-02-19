import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Stack
} from '@mui/material';
import Socials from '../components/Socials';
import { featureFlags } from '../config/featureFlags';

interface MainLink {
  title: string;
  href: string;
  onClick: () => void;
  flag?: keyof typeof featureFlags;
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const allLinks: MainLink[] = [
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
      flag: 'showContactPage',
    },
  ];

  const links = allLinks.filter(link => !link.flag || featureFlags[link.flag]);


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

        {/* Nomination Banner */}
        {/* <Box
          sx={{
            border: '2px solid rgba(0, 0, 0)',
            padding: { xs: 2.5, sm: 3 },
            marginBottom: 3,
            textAlign: 'center',
            width: '100%',
            maxWidth: 420,
            mx: 'auto',
            backgroundColor: 'primary.light',
          }}
        >
          <Typography
            sx={{
              marginBottom: 2,
              fontWeight: 600,
              color: '#1a1a1a',
              fontSize: { xs: '0.95rem', sm: '1.05rem' },
              lineHeight: 1.5,
            }}
          >
            Submit yourself to be nominated for our 1st Annual 808s Awards Show!
          </Typography>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/nominations')}
            sx={{
              padding: '18px 36px',
              borderColor: '#000000',
              borderRadius: 0,
              color: '#000000',
              '&:hover': {
                borderColor: '#000000',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Nominate
          </Button>
        </Box> */}

        {/* Social Links */}
        <Socials sx={{ marginBottom: 3 }} />
      </Container>
    </Box>
  );
};

export default MainPage;
