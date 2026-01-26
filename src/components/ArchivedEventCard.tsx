import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  Button,
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  Event as EventIcon,
  Group,
  OpenInNew,
} from '@mui/icons-material';
import VideoEmbed from './VideoEmbed';
import { Event } from '../config/supabase';
import { detectVideoPlatform } from '../utils/videoPlatform';

interface ArchivedEventCardProps {
  event: Event;
}

const ArchivedEventCard: React.FC<ArchivedEventCardProps> = ({ event }) => {
  const [expandedDescription, setExpandedDescription] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shouldTruncate = (description: string): boolean => {
    return description.length > 180;
  };

  const videoPlatform = detectVideoPlatform(event.video_url);
  
  const getViewButtonText = (platform: typeof videoPlatform): string => {
    switch (platform) {
      case 'instagram':
        return 'View on Instagram';
      case 'tiktok':
        return 'View on TikTok';
      case 'other':
        return 'View video';
      default:
        return 'View video';
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: 'primary.light',
        border: '2px solid black',
        borderRadius: 0,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent sx={{ padding: 3 }}>
        {/* Mobile Layout */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Video Embed or View Button */}
          {event.video_url && videoPlatform === 'youtube' && (
            <Box sx={{ width: '100%', marginBottom: 2 }}>
              <VideoEmbed url={event.video_url} />
            </Box>
          )}

          {/* Content Below Video */}
          <Box sx={{ width: '100%' }}>
            <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: 600 }}>
              {event.name}
            </Typography>

            {/* Event Details */}
            <Stack spacing={1} sx={{ marginBottom: 2, alignItems: 'flex-start', textAlign: 'left' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ color: 'black', fontSize: '1rem' }} />
                <Typography variant="body2" sx={{ color: 'black' }}>
                  {event.location}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EventIcon sx={{ color: 'black', fontSize: '1rem' }} />
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    {formatDate(event.date)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime sx={{ color: 'black', fontSize: '1rem' }} />
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    {event.time}
                  </Typography>
                </Box>
              </Box>

              {event.attending_members && event.attending_members.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Group sx={{ color: 'black', fontSize: '1rem' }} />
                    <Typography variant="body2" sx={{ color: 'black', fontWeight: 500 }}>
                      Attending:
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 0.5,
                      flexWrap: 'wrap',
                      paddingLeft: 2.5,
                    }}
                  >
                    {event.attending_members.map((member, index) => (
                      <Chip
                        key={index}
                        label={member}
                        size="small"
                        sx={{
                          backgroundColor: 'transparent',
                          border: '2px solid black',
                          color: 'black',
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Stack>

            {/* Description */}
            {event.description && (
              <Box sx={{ marginBottom: 2, textAlign: 'left' }}>
                <Typography
                  variant="body1"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: expandedDescription ? 'unset' : 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: expandedDescription ? 'visible' : 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: shouldTruncate(event.description) ? 1 : 0,
                  }}
                >
                  {event.description}
                </Typography>
                {shouldTruncate(event.description) && (
                  <Button
                    onClick={() => setExpandedDescription(!expandedDescription)}
                    sx={{
                      color: 'black',
                      textTransform: 'none',
                      padding: 0,
                      minWidth: 'auto',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      textDecoration: 'underline',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {expandedDescription ? 'Read Less' : 'Read More'}
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Box>

        {event.video_url && videoPlatform !== 'youtube' && videoPlatform !== null && (
            <Box sx={{ width: '100%', marginBottom: 2, textAlign: 'center' }}>
              <Button
                variant="outlined"
                href={event.video_url}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNew />}
                sx={{
                  border: '2px solid black',
                  color: 'black',
                  backgroundColor: 'primary.light',
                  borderRadius: 0,
                  textTransform: 'none',
                  fontWeight: 600,
                  padding: '10px 20px',
                  '&:hover': {
                    border: '2px solid black',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  },
                }}
              >
                {getViewButtonText(videoPlatform)}
              </Button>
            </Box>
          )}

        {/* Desktop Layout */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'space-between',
            alignItems: event.video_url && videoPlatform !== 'youtube' ? 'center' : 'flex-start',
            gap: 3,
          }}
        >
          {/* Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: 600, wordBreak: 'break-word' }}>
              {event.name}
            </Typography>

            {/* Event Details */}
            <Stack spacing={1} sx={{ marginBottom: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ color: 'black', fontSize: '1rem' }} />
                <Typography variant="body2" sx={{ color: 'black' }}>
                  {event.location}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EventIcon sx={{ color: 'black', fontSize: '1rem' }} />
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    {formatDate(event.date)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime sx={{ color: 'black', fontSize: '1rem' }} />
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    {event.time}
                  </Typography>
                </Box>
              </Box>

              {event.attending_members && event.attending_members.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Group sx={{ color: 'black', fontSize: '1rem' }} />
                    <Typography variant="body2" sx={{ color: 'black', fontWeight: 500 }}>
                      Attending:
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 0.5,
                      flexWrap: 'wrap',
                      paddingLeft: 2.5,
                    }}
                  >
                    {event.attending_members.map((member, index) => (
                      <Chip
                        key={index}
                        label={member}
                        size="small"
                        sx={{
                          backgroundColor: 'transparent',
                          border: '2px solid black',
                          color: 'black',
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Stack>

            {/* Description */}
            {event.description && (
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: expandedDescription ? 'unset' : 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: expandedDescription ? 'visible' : 'hidden',
                    textOverflow: 'ellipsis',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    marginBottom: shouldTruncate(event.description) ? 1 : 0,
                  }}
                >
                  {event.description}
                </Typography>
                {shouldTruncate(event.description) && (
                  <Button
                    onClick={() => setExpandedDescription(!expandedDescription)}
                    sx={{
                      color: 'black',
                      textTransform: 'none',
                      padding: 0,
                      minWidth: 'auto',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      textDecoration: 'underline',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {expandedDescription ? 'Read Less' : 'Read More'}
                  </Button>
                )}
              </Box>
            )}
          </Box>

          {/* Video Embed or View Button */}
          {event.video_url && videoPlatform === 'youtube' && (
            <Box sx={{ flexShrink: 0, width: { md: 300, lg: 400 } }}>
              <VideoEmbed url={event.video_url} />
            </Box>
          )}
          {event.video_url && videoPlatform !== 'youtube' && videoPlatform !== null && (
            <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              <Button
                variant="outlined"
                href={event.video_url}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNew />}
                sx={{
                  border: '2px solid black',
                  color: 'black',
                  backgroundColor: 'primary.light',
                  borderRadius: 0,
                  textTransform: 'none',
                  fontWeight: 600,
                  padding: '10px 20px',
                  '&:hover': {
                    border: '2px solid black',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  },
                }}
              >
                {getViewButtonText(videoPlatform)}
              </Button>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArchivedEventCard;
