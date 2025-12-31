import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';
import { featureFlags } from '../config/featureFlags';

interface NavigationProps {
  showBackButton?: boolean;
  title?: string;
}

interface NavItem {
  label: string;
  path: string;
  flag?: keyof typeof featureFlags;
}

const Navigation: React.FC<NavigationProps> = ({ showBackButton = false, title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const allNavItems: NavItem[] = [
    { label: 'Home', path: '/main' },
    { label: 'Episodes', path: '/episodes' },
    { label: 'Team', path: '/team' },
    { label: 'Interviews', path: '/interviews' },
    { label: 'Events', path: '/events' },
    { label: 'Nominate', path: '/nominations' },
    { label: 'Contact', path: '/contact', flag: 'showContactPage' },
  ];

  const navItems = allNavItems.filter(item => !item.flag || featureFlags[item.flag]);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'primary.light',
        border: '2px solid black',
        borderRadius: 0,
        boxShadow: 'none',
        marginBottom: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {showBackButton && (
            <IconButton
              onClick={handleBack}
              sx={{
                color: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.1)',
                },
              }}
            >
              <ArrowBack />
            </IconButton>
          )}
          
          <IconButton
            onClick={() => navigate('/main')}
            sx={{
              color: 'black',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.1)',
              },
            }}
          >
            <Home />
          </IconButton>

          {title && (
            <Typography variant="h6" sx={{ color: 'black', fontWeight: 600 }}>
              {title}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                color: 'black',
                backgroundColor: location.pathname === item.path ? 'rgba(0,0,0,0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.1)',
                },
                borderRadius: 0,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
