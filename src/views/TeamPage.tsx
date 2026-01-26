import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import PersonCard from '../components/PersonCard';
import Socials from '../components/Socials';
import { getAllTeamMembers } from '../services/teamService';
import { TeamMember } from '../config/supabase';

const TeamPage: React.FC = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllTeamMembers();
      console.log('Team members loaded:', data);
      setTeamMembers(data);
    } catch (err) {
      console.error('Error loading team members:', err);
      setError(`Failed to load team members: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        padding: 2,
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
              width: 150,
              height: 150,
              margin: '0 auto 16px',
              display: 'block',
              cursor: 'pointer',
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/main')}
              sx={{
                color: 'black',
                backgroundColor: 'primary.light',
                borderColor: 'black',
                borderRadius: 0,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                padding: { xs: '6px 12px', sm: '8px 16px' },
                '&:hover': {
                  borderColor: 'black',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                },
              }}
              variant="outlined"
            >
              Back
            </Button>
            <Typography 
              variant="h3" 
              sx={{ 
                color: 'black',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              Team
            </Typography>
          </Box>
        </Box>

        {/* Team Members */}
        <Box sx={{ marginTop: 4 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 8 }}>
              <CircularProgress sx={{ color: 'black' }} size={60} />
            </Box>
          ) : error ? (
            <Alert
              severity="error"
              sx={{
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                border: '2px solid #d32f2f',
                borderRadius: 0,
              }}
            >
              {error}
            </Alert>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                gap: { xs: 2, sm: 4 },
                justifyContent: 'center',
              }}
            >
              {teamMembers.map((member) => (
                <PersonCard
                  key={member.id}
                  name={member.name}
                  image={member.image_url}
                  onClick={() => navigate(`/person/${member.name}`)}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Social Links */}
        <Socials sx={{ marginTop: 4 }} />
      </Container>
    </Box>
  );
};

export default TeamPage;
