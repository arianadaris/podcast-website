import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { ArrowBack, Search, Clear } from '@mui/icons-material';
import PersonCard from '../components/PersonCard';
import interviewsData from '../assets/data/interviews.json';

const InterviewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSeason, setSelectedSeason] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  // Get available seasons from the data
  const availableSeasons = interviewsData.map(seasonData => seasonData.season.toString());
  
  // Create a lookup object for easier access
  const seasonDataLookup = interviewsData.reduce((acc, seasonData) => {
    acc[seasonData.season.toString()] = seasonData.interviews;
    return acc;
  }, {} as Record<string, typeof interviewsData[0]['interviews']>);

  const currentSeasonInterviews = seasonDataLookup[selectedSeason] || [];

  // Filter interviews based on search query
  const filteredInterviews = searchQuery
    ? Object.values(seasonDataLookup).flat().filter(interview =>
        interview.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentSeasonInterviews;

  const handleClearSearch = () => {
    setSearchQuery('');
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
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', position: 'relative' }}>
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
                  transform: 'translateX(-50%)',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }
                }}
              >
                Interviews
              </Typography>
              <Box sx={{ width: 100 }} /> {/* Spacer for centering */}
            </Box>
            
            {/* Search bar on its own line */}
            <TextField
              placeholder="Search interviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: { xs: '100%', sm: 300, md: 250 },
                '& .MuiOutlinedInput-root': {
                  color: 'black',
                  backgroundColor: 'primary.light',
                  borderColor: 'black',
                  borderRadius: 0,
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&:hover fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'black',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'black',
                  opacity: 0.7,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'black' }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClearSearch}
                      size="small"
                      sx={{ color: 'black' }}
                    >
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Season Selection - Hidden when searching */}
        {!searchQuery && (
          <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel sx={{ color: 'black' }}>Select Season</InputLabel>
              <Select
                value={selectedSeason}
                label="Select Season"
                onChange={(e) => setSelectedSeason(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: 0,
                      border: '1px solid black',
                      '& .MuiMenuItem-root': {
                        borderRadius: 0,
                      },
                    },
                  },
                }}
                sx={{
                  color: 'black',
                  backgroundColor: 'primary.light',
                  borderRadius: 0,
                  borderColor: 'black',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                    borderRadius: 0,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                }}
              >
                {availableSeasons.map((season) => (
                  <MenuItem key={season} value={season}>
                    Season {season}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Interviewed People */}
        <Box sx={{ marginTop: 4 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(5, 1fr)'
              },
              gap: { xs: 2, sm: 3, md: 4 },
              justifyContent: 'center',
            }}
          >
            {filteredInterviews.map((interview) => (
              <PersonCard
                key={interview.id}
                name={interview.name}
                image={interview.image}
                onClick={() => window.open(interview.link, '_blank')} // Open interview link in new tab
                hoverText="View Interview"
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default InterviewsPage;
