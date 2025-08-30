import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import PersonCard from '../components/PersonCard';

interface TeamPageProps {
  onBack: () => void;
  onNavigateToPerson: (personId: string) => void;
}

const TeamPage: React.FC<TeamPageProps> = ({ onBack, onNavigateToPerson }) => {
  const teamMembers = [
    {
      id: 'person1',
      name: 'Alex Johnson',
      image: '/images/person1.jpg', // You'll need to add these images to public/images/
    },
    {
      id: 'person2',
      name: 'Sarah Chen',
      image: '/images/person2.jpg',
    },
    {
      id: 'person3',
      name: 'Mike Rodriguez',
      image: '/images/person3.jpg',
    },
    {
      id: 'person4',
      name: 'Emily Davis',
      image: '/images/person4.jpg',
    },
  ];

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
            sx={{
              width: 150,
              height: 150,
              margin: '0 auto 16px',
              display: 'block',
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={onBack}
              sx={{
                color: 'black',
                backgroundColor: 'primary.light',
                borderColor: 'black',
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
                image={member.image}
                onClick={() => onNavigateToPerson(member.id)}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TeamPage;
