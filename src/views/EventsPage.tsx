import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import EventCard from '../components/EventCard';
import Socials from '../components/Socials';
import eventsData from '../assets/data/events.json';

const EventsPage: React.FC = () => {
  const navigate = useNavigate();

  // Sort events by date (soonest first)
  const sortedEvents = [...eventsData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        padding: 2,
      }}
    >
      <Container maxWidth={false} sx={{ 
        maxWidth: { xs: '97vw', sm: '80vw', md: '70vw', lg: '60vw' }, 
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
              Events
            </Typography>
          </Box>
        </Box>

        {/* Events List */}
        <Box sx={{ marginTop: 4 }}>
          {sortedEvents.length > 0 ? (
            <Stack spacing={3}>
              {sortedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  name={event.name}
                  location={event.location}
                  date={event.date}
                  time={event.time}
                  attendingMembers={event.attendingMembers}
                  description={event.description}
                />
              ))}
            </Stack>
          ) : (
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  color: 'black',
                  opacity: 0.8,
                }}
              >
                No upcoming events at the moment.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'black',
                  opacity: 0.6,
                  marginTop: 1,
                }}
              >
                Check back soon for new events!
              </Typography>
            </Box>
          )}
        </Box>

        {/* Social Links */}
        <Socials sx={{ marginTop: 4 }} />
      </Container>
    </Box>
  );
};

export default EventsPage;
