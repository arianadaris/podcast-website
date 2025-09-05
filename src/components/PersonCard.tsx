import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActionArea,
  Avatar,
  IconButton,
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

interface PersonCardProps {
  name: string;
  image: string;
  onClick: () => void;
  hoverText?: string;
}

const PersonCard: React.FC<PersonCardProps> = ({ name, image, onClick, hoverText }) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const cardContent = (
    <Card
      sx={{
        width: { xs: 180, sm: 180, md: 200 },
        height: { xs: 200, sm: 220, md: 250 },
        backgroundColor: 'primary.light',
        border: '2px solid black',
        borderRadius: 0,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardActionArea
        onClick={hoverText ? undefined : onClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: { xs: 1, sm: 1.5, md: 2 },
          cursor: hoverText ? 'default' : 'pointer',
        }}
      >
        {!imageError ? (
          <Box
            sx={{
              position: 'relative',
              width: { xs: 120, sm: 140, md: 160 },
              height: { xs: 120, sm: 140, md: 160 },
              marginBottom: { xs: 1, sm: 1.5, md: 2 },
            }}
          >
            <Box
              component="img"
              src={image}
              alt={name}
              onError={handleImageError}
              sx={{
                width: '100%',
                height: '100%',
                border: '2px solid black',
                objectFit: 'cover',
                borderRadius: 0,
              }}
            />
            {hoverText && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  color: 'black',
                  backgroundColor: 'primary.light',
                  border: '1px solid black',
                  width: { xs: 32, sm: 36, md: 40 },
                  height: { xs: 32, sm: 36, md: 40 },
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  },
                }}
              >
                <PlayArrow sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }} />
              </IconButton>
            )}
          </Box>
        ) : (
          <Avatar
            sx={{
              width: { xs: 120, sm: 140, md: 160 },
              height: { xs: 120, sm: 140, md: 160 },
              border: '2px solid black',
              marginBottom: { xs: 1, sm: 1.5, md: 2 },
              backgroundColor: 'rgba(0,0,0,0.1)',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              color: 'black',
              borderRadius: 0,
            }}
          >
            {name.split(' ').map(n => n[0]).join('')}
          </Avatar>
        )}
        <CardContent sx={{ padding: 0, textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              color: 'black',
              fontWeight: 600,
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            }}
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return cardContent;
};

export default PersonCard;
