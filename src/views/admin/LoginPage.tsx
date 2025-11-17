import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  TextField,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, signInWithPassword, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate('/admin/dashboard');
    }
  }, [user, loading, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setSigningIn(true);
      setError(null);
      const { error } = await signInWithPassword(email, password);
      
      if (error) {
        setError(error.message || 'Failed to sign in');
        setSigningIn(false);
      }
      // If successful, the auth state change will trigger navigation
    } catch (err) {
      setError('An unexpected error occurred');
      setSigningIn(false);
    }
  };


  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress sx={{ color: 'black' }} size={60} />
      </Box>
    );
  }

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
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          <Box
            component="img"
            src="/logo.png"
            alt="808s & COLD TAKES Logo"
            sx={{
              width: 150,
              height: 150,
              margin: '0 auto 16px',
              display: 'block',
            }}
          />
          <Typography
            variant="h3"
            sx={{
              color: 'black',
              marginBottom: 1,
            }}
          >
            Admin Portal
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'black',
              opacity: 0.8,
            }}
          >
            Sign in to manage your content
          </Typography>
        </Box>

        <Card
          sx={{
            backgroundColor: 'primary.light',
            border: '2px solid black',
            borderRadius: 0,
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          }}
        >
          <CardContent sx={{ padding: 4 }}>
            {error && (
              <Alert
                severity="error"
                sx={{
                  marginBottom: 3,
                  backgroundColor: 'rgba(211, 47, 47, 0.1)',
                  border: '2px solid #d32f2f',
                  borderRadius: 0,
                  color: 'black',
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSignIn}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={signingIn}
                sx={{
                  marginBottom: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    '& fieldset': {
                      borderColor: 'black',
                      borderWidth: 2,
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'black',
                    '&.Mui-focused': {
                      color: 'black',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={signingIn}
                sx={{
                  marginBottom: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    '& fieldset': {
                      borderColor: 'black',
                      borderWidth: 2,
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'black',
                    '&.Mui-focused': {
                      color: 'black',
                    },
                  },
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={signingIn}
                sx={{
                  color: 'white',
                  backgroundColor: 'black',
                  border: '2px solid black',
                  borderRadius: 0,
                  padding: '12px 24px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.85)',
                  },
                  '&:disabled': {
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'rgba(255,255,255,0.5)',
                  },
                }}
              >
                {signingIn ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  'Sign In'
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ marginTop: 3, textAlign: 'center' }}>
          <Button
            onClick={() => navigate('/')}
            sx={{
              color: 'black',
              textDecoration: 'underline',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              },
            }}
          >
            Back to Website
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;

