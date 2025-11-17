import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import EventCard from '../components/EventCard';
import Socials from '../components/Socials';
import { getAllEvents } from '../services/eventService';
import { Event } from '../config/supabase';

const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getAllEvents();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events');
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
          ) : events.length > 0 ? (
            <Stack spacing={3}>
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  name={event.name}
                  location={event.location}
                  date={event.date}
                  time={event.time}
                  attendingMembers={event.attending_members}
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
