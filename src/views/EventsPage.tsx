import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import EventCard from '../components/EventCard';

interface EventsPageProps {
  onBack: () => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ onBack }) => {
  // Sample events data - in a real app, this would come from an API or database
  const events = [
    {
      id: 'event1',
      name: 'Podcast Live Recording',
      location: 'The Blue Room, Downtown',
      date: 'December 15, 2024',
      time: '7:00 PM',
      attendingMembers: ['Alex Johnson', 'Sarah Chen', 'Mike Rodriguez'],
      description: 'Join us for a live recording of our latest episode where we discuss the future of hip-hop production.',
    },
    {
      id: 'event2',
      name: 'Music Production Workshop',
      location: 'Studio 808, Music District',
      date: 'December 20, 2024',
      time: '2:00 PM',
      attendingMembers: ['Alex Johnson', 'Emily Davis'],
      description: 'Learn the basics of 808 drum programming and modern beat making techniques.',
    },
    {
      id: 'event3',
      name: 'Artist Interview Session',
      location: 'The Podcast Studio',
      date: 'December 28, 2024',
      time: '6:30 PM',
      attendingMembers: ['Sarah Chen', 'Mike Rodriguez', 'Emily Davis'],
      description: 'Exclusive interview with upcoming hip-hop producer discussing their creative process.',
    },
    {
      id: 'event4',
      name: 'New Year\'s Eve Special',
      location: 'Club Bassline',
      date: 'December 31, 2024',
      time: '9:00 PM',
      attendingMembers: ['Alex Johnson', 'Sarah Chen', 'Mike Rodriguez', 'Emily Davis'],
      description: 'Ring in the new year with our special live podcast recording featuring guest DJs and producers.',
    },
    {
      id: 'event5',
      name: 'Producer Meet & Greet',
      location: 'Vinyl Records Store',
      date: 'January 5, 2025',
      time: '4:00 PM',
      attendingMembers: ['Alex Johnson', 'Sarah Chen'],
      description: 'Meet local producers and share your music. Networking event for the hip-hop community.',
    },
  ];

  // Sort events by date (soonest first)
  const sortedEvents = [...events].sort((a, b) => {
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
      </Container>
    </Box>
  );
};

export default EventsPage;
