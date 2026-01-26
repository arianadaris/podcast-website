import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';

interface VideoEmbedProps {
  url: string;
  width?: string | number;
  height?: string | number;
}

type Platform = 'youtube' | 'tiktok' | 'instagram' | 'unknown';

interface ParsedVideo {
  platform: Platform;
  embedUrl: string;
  videoId: string;
}

const parseVideoUrl = (url: string): ParsedVideo | null => {
  if (!url) return null;

  try {
    // YouTube patterns
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      return {
        platform: 'youtube',
        videoId: youtubeMatch[1],
        embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=0`,
      };
    }

    // TikTok patterns
    // Format: tiktok.com/@username/video/1234567890 or vm.tiktok.com/XXXXX
    const tiktokVideoRegex = /tiktok\.com\/@[\w.-]+\/video\/(\d+)/;
    const tiktokVideoMatch = url.match(tiktokVideoRegex);
    if (tiktokVideoMatch) {
      return {
        platform: 'tiktok',
        videoId: tiktokVideoMatch[1],
        embedUrl: `https://www.tiktok.com/embed/v2/${tiktokVideoMatch[1]}`,
      };
    }

    // TikTok short link (vm.tiktok.com) - these need to be resolved, but we'll try to embed the original URL
    if (url.includes('vm.tiktok.com') || url.includes('tiktok.com')) {
      // For TikTok, we'll use a blockquote embed approach which is more reliable
      // But for iframe, we'll use the embed URL format
      const tiktokId = url.split('/').pop()?.split('?')[0];
      if (tiktokId) {
        return {
          platform: 'tiktok',
          videoId: tiktokId,
          embedUrl: `https://www.tiktok.com/embed/v2/${tiktokId}`,
        };
      }
    }

    // Instagram patterns (posts and reels)
    const instagramPostRegex = /instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/;
    const instagramMatch = url.match(instagramPostRegex);
    if (instagramMatch) {
      return {
        platform: 'instagram',
        videoId: instagramMatch[1],
        embedUrl: `https://www.instagram.com/p/${instagramMatch[1]}/embed/`,
      };
    }

    return null;
  } catch (error) {
    return null;
  }
};

const VideoEmbed: React.FC<VideoEmbedProps> = ({ url, width = '100%', height = 'auto' }) => {
  const parsedVideo = useMemo(() => parseVideoUrl(url), [url]);

  if (!parsedVideo) {
    return (
      <Box
        sx={{
          width,
          padding: 2,
          backgroundColor: 'rgba(0,0,0,0.1)',
          border: '2px solid black',
          borderRadius: 0,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" sx={{ color: 'black', opacity: 0.7 }}>
          Invalid or unsupported video URL
        </Typography>
      </Box>
    );
  }

  // Calculate aspect ratio based on platform
  // YouTube: 16:9 (56.25%), TikTok/Instagram: typically 9:16 (177.78%) but can vary
  const getAspectRatio = (platform: Platform): string => {
    switch (platform) {
      case 'youtube':
        return '56.25%'; // 16:9
      case 'tiktok':
        return '177.78%'; // 9:16 (vertical)
      case 'instagram':
        return '100%'; // 1:1 (square) - Instagram posts are typically square
      default:
        return '56.25%';
    }
  };

  return (
    <Box
      sx={{
        width,
        position: 'relative',
        paddingBottom: getAspectRatio(parsedVideo.platform),
        height: 0,
        overflow: 'hidden',
        border: '2px solid black',
        borderRadius: 0,
        backgroundColor: 'rgba(0,0,0,0.1)',
      }}
    >
      <Box
        component="iframe"
        src={parsedVideo.embedUrl}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={`${parsedVideo.platform} video embed`}
      />
    </Box>
  );
};

export default VideoEmbed;
