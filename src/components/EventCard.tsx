import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  Event,
  Group,
  OpenInNew,
} from '@mui/icons-material';
import VideoEmbed from './VideoEmbed';
import { detectVideoPlatform } from '../utils/videoPlatform';

interface EventCardProps {
  name: string;
  location: string;
  date: string;
  time: string;
  attendingMembers: string[];
  description?: string;
  video_url?: string;
}

const EventCard: React.FC<EventCardProps> = ({ 
  name, 
  location, 
  date, 
  time, 
  attendingMembers, 
  description,
  video_url
}) => {
  return (
    <Card
      sx={{
        backgroundColor: 'primary.light',
        border: '2px solid black',
        borderRadius: 0,
        marginBottom: 2,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardContent sx={{ padding: 3 }}>
        {/* Event Name */}
        <Typography
          variant="h5"
          sx={{
            color: 'black',
            fontWeight: 700,
            marginBottom: 2,
            fontSize: '1.5rem',
          }}
        >
          {name}
        </Typography>

        {/* Desktop Layout - Content and Video/Button Side by Side */}
        <Box
          sx={{
            display: { xs: 'block', sm: 'flex' },
            gap: 3,
            alignItems: 'flex-start',
          }}
        >
          {/* Event Details */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack spacing={2} sx={{ marginBottom: 2 }}>
              {/* Location */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ color: 'black', fontSize: '1.2rem' }} />
                <Typography
                  variant="body1"
                  sx={{
                    color: 'black',
                    fontWeight: 500,
                    fontSize: '1rem',
                  }}
                >
                  {location}
                </Typography>
              </Box>

              {/* Date and Time */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Event sx={{ color: 'black', fontSize: '1.2rem' }} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'black',
                      fontWeight: 500,
                      fontSize: '1rem',
                    }}
                  >
                    {date}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime sx={{ color: 'black', fontSize: '1.2rem' }} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'black',
                      fontWeight: 500,
                      fontSize: '1rem',
                    }}
                  >
                    {time}
                  </Typography>
                </Box>
              </Box>

              {/* Attending Members */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Group sx={{ color: 'black', fontSize: '1.2rem' }} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'black',
                      fontWeight: 500,
                      fontSize: '1rem',
                    }}
                  >
                    Attending:
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    gap: 0.5, 
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    flexWrap: 'nowrap',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                      display: 'none',
                    },
                    paddingLeft: 2.5,
                  }}
                >
                  {attendingMembers.map((member, index) => (
                    <Chip
                      key={index}
                      label={member}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        color: 'black',
                        border: '1px solid black',
                        fontWeight: 500,
                        fontSize: '0.8rem',
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Stack>

            {/* Description */}
            {description && (
              <Typography
                variant="body2"
                sx={{
                  color: 'black',
                  opacity: 0.8,
                  fontSize: '0.9rem',
                  lineHeight: 1.4,
                  borderTop: '1px solid rgba(0,0,0,0.2)',
                  paddingTop: 2,
                }}
              >
                {description}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
