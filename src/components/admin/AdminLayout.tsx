import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { ArrowBack, Logout, Person } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  backTo?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  showBackButton = true,
  backTo = '/admin/dashboard',
}) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        padding: 2,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: '97vw', sm: '90vw', md: '85vw', lg: '80vw' },
          paddingX: 2,
        }}
      >
        {/* Header */}
        <Box sx={{ marginBottom: 4 }}>
          {/* Logo and User Info Row */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="808s & COLD TAKES Logo"
              onClick={() => navigate('/admin/dashboard')}
              sx={{
                width: { xs: 80, sm: 100 },
                height: { xs: 80, sm: 100 },
                cursor: 'pointer',
              }}
            />

            {/* User Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right' }}>
                <Typography variant="body2" sx={{ color: 'black', fontWeight: 600 }}>
                  {user?.email}
                </Typography>
              </Box>

              <Button
                onClick={handleMenuOpen}
                sx={{
                  minWidth: 'auto',
                  padding: 1,
                  borderRadius: '50%',
                  backgroundColor: 'primary.light',
                  border: '2px solid black',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Avatar
                  src={user?.user_metadata?.avatar_url}
                  alt={user?.email}
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: 'black',
                  }}
                >
                  <Person />
                </Avatar>
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    backgroundColor: 'primary.light',
                    border: '2px solid black',
                    borderRadius: 0,
                    marginTop: 1,
                  },
                }}
              >
                <MenuItem
                  sx={{
                    display: { xs: 'flex', sm: 'none' },
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                    paddingY: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {user?.email}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                  <Logout sx={{ marginRight: 1, fontSize: 20 }} />
                  Sign Out
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Title and Navigation Row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            {showBackButton ? (
              <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(backTo)}
                sx={{
                  color: 'black',
                  backgroundColor: 'primary.light',
                  borderColor: 'black',
                  borderRadius: 0,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  padding: { xs: '6px 12px', sm: '8px 16px' },
                  border: '2px solid black',
                  '&:hover': {
                    borderColor: 'black',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  },
                }}
                variant="outlined"
              >
                Back
              </Button>
            ) : (
              <Box sx={{ width: { xs: 60, sm: 80 } }} />
            )}

            <Typography
              variant="h3"
              sx={{
                color: 'black',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button
                onClick={() => navigate('/')}
                sx={{
                  color: 'black',
                  backgroundColor: 'transparent',
                  borderColor: 'black',
                  borderRadius: 0,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  padding: { xs: '6px 12px', sm: '8px 16px' },
                  border: '2px solid black',
                  '&:hover': {
                    borderColor: 'black',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  },
                }}
                variant="outlined"
              >
                View Site
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* Content */}
        <Box>{children}</Box>
      </Container>
    </Box>
  );
};

export default AdminLayout;

