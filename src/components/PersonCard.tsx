import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActionArea,
  Avatar,
} from '@mui/material';

interface PersonCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ name, image, onClick }) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
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
        onClick={onClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: { xs: 1, sm: 1.5, md: 2 },
        }}
      >
        {!imageError ? (
          <Box
            component="img"
            src={image}
            alt={name}
            onError={handleImageError}
            sx={{
              width: { xs: 80, sm: 100, md: 120 },
              height: { xs: 80, sm: 100, md: 120 },
              borderRadius: '50%',
              border: '2px solid black',
              marginBottom: { xs: 1, sm: 1.5, md: 2 },
              objectFit: 'cover',
            }}
          />
        ) : (
          <Avatar
            sx={{
              width: { xs: 80, sm: 100, md: 120 },
              height: { xs: 80, sm: 100, md: 120 },
              border: '2px solid black',
              marginBottom: { xs: 1, sm: 1.5, md: 2 },
              backgroundColor: 'rgba(0,0,0,0.1)',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              color: 'black',
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
};

export default PersonCard;
