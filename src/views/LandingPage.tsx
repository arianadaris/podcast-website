import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
} from '@mui/material';
import Socials from '../components/Socials';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          maxWidth: { xs: '100%', sm: '80vw', md: '70vw', lg: '50vw' },
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src="/logo.png"
          alt="808s & COLD TAKES Logo"
          onClick={() => navigate('/main')}
          sx={{
            width: { xs: 250, sm: 300 },
            height: { xs: 250, sm: 300 },
            marginBottom: '40px',
            cursor: 'pointer',
          }}
        />

          {/* Enter Button */}
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/main')}
            sx={{
              padding: '18px 36px',
              borderColor: '#000000',
              borderRadius: 0,
              color: '#000000',
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                },
                '50%': {
                  transform: 'scale(1.05)',
                },
                '100%': {
                  transform: 'scale(1)',
                },
              },
              '&:hover': {
                borderColor: '#000000',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateY(-2px) scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            ENTER
          </Button>

        {/* Social Links */}
        <Socials sx={{ marginTop: 4 }} />
      </Box>
    </Box>
  );
};

export default LandingPage;
