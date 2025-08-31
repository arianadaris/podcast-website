import React from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Stack,
} from '@mui/material';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth={false} sx={{ 
        maxWidth: { xs: '97vw', sm: '80vw', md: '70vw', lg: '50vw' }, 
        paddingX: 2 
      }}>
        <Box
          sx={{
            textAlign: 'center',
            padding: 4,
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src="/logo.png"
            alt="808s & COLD TAKES Logo"
            sx={{
              width: 300,
              height: 300,
              margin: '0 0 40px -17px',
              display: 'block',
            }}
          />

          {/* Enter Button */}
          <Button
            variant="outlined"
            size="large"
            onClick={onEnter}
            sx={{
              padding: '18px 36px',
              borderColor: '#000000',
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
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
