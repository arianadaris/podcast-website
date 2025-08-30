import React, { useState } from 'react';
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

interface InterviewsPageProps {
  onBack: () => void;
  onNavigateToPerson: (personId: string) => void;
}

const InterviewsPage: React.FC<InterviewsPageProps> = ({ onBack, onNavigateToPerson }) => {
  const [selectedSeason, setSelectedSeason] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for interviewed people by season
  const seasonData = {
    '1': [
      { id: 'interview1-1', name: 'John Smith', image: '/images/interview1-1.jpg' },
      { id: 'interview1-2', name: 'Maria Garcia', image: '/images/interview1-2.jpg' },
      { id: 'interview1-3', name: 'David Wilson', image: '/images/interview1-3.jpg' },
      { id: 'interview1-4', name: 'Lisa Brown', image: '/images/interview1-4.jpg' },
      { id: 'interview1-5', name: 'Robert Taylor', image: '/images/interview1-5.jpg' },
      { id: 'interview1-6', name: 'Jennifer Lee', image: '/images/interview1-6.jpg' },
      { id: 'interview1-7', name: 'Michael Anderson', image: '/images/interview1-7.jpg' },
      { id: 'interview1-8', name: 'Amanda White', image: '/images/interview1-8.jpg' },
      { id: 'interview1-9', name: 'Christopher Martinez', image: '/images/interview1-9.jpg' },
      { id: 'interview1-10', name: 'Jessica Thompson', image: '/images/interview1-10.jpg' },
    ],
    '2': [
      { id: 'interview2-1', name: 'Daniel Johnson', image: '/images/interview2-1.jpg' },
      { id: 'interview2-2', name: 'Rachel Davis', image: '/images/interview2-2.jpg' },
      { id: 'interview2-3', name: 'Kevin Miller', image: '/images/interview2-3.jpg' },
      { id: 'interview2-4', name: 'Stephanie Moore', image: '/images/interview2-4.jpg' },
      { id: 'interview2-5', name: 'Andrew Jackson', image: '/images/interview2-5.jpg' },
      { id: 'interview2-6', name: 'Nicole Martin', image: '/images/interview2-6.jpg' },
      { id: 'interview2-7', name: 'Ryan Lee', image: '/images/interview2-7.jpg' },
      { id: 'interview2-8', name: 'Ashley Perez', image: '/images/interview2-8.jpg' },
      { id: 'interview2-9', name: 'Brandon Thompson', image: '/images/interview2-9.jpg' },
      { id: 'interview2-10', name: 'Megan Garcia', image: '/images/interview2-10.jpg' },
    ],
    '3': [
      { id: 'interview3-1', name: 'Tyler Robinson', image: '/images/interview3-1.jpg' },
      { id: 'interview3-2', name: 'Lauren Clark', image: '/images/interview3-2.jpg' },
      { id: 'interview3-3', name: 'Jordan Lewis', image: '/images/interview3-3.jpg' },
      { id: 'interview3-4', name: 'Hannah Walker', image: '/images/interview3-4.jpg' },
      { id: 'interview3-5', name: 'Cody Hall', image: '/images/interview3-5.jpg' },
      { id: 'interview3-6', name: 'Victoria Young', image: '/images/interview3-6.jpg' },
      { id: 'interview3-7', name: 'Austin King', image: '/images/interview3-7.jpg' },
      { id: 'interview3-8', name: 'Samantha Wright', image: '/images/interview3-8.jpg' },
      { id: 'interview3-9', name: 'Nathan Lopez', image: '/images/interview3-9.jpg' },
      { id: 'interview3-10', name: 'Olivia Hill', image: '/images/interview3-10.jpg' },
    ],
  };

  const currentSeasonInterviews = seasonData[selectedSeason as keyof typeof seasonData] || [];

  // Filter interviews based on search query
  const filteredInterviews = searchQuery
    ? Object.values(seasonData).flat().filter(person =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            sx={{
              width: 150,
              height: 150,
              margin: '0 auto 16px',
              display: 'block',
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', position: 'relative' }}>
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
                sx={{
                  color: 'black',
                  backgroundColor: 'primary.light',
                  borderColor: 'black',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                }}
              >
                <MenuItem value="1">Season 1</MenuItem>
                <MenuItem value="2">Season 2</MenuItem>
                <MenuItem value="3">Season 3</MenuItem>
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
            {filteredInterviews.map((person) => (
              <PersonCard
                key={person.id}
                name={person.name}
                image={person.image}
                onClick={() => {}} // Remove navigation - cards are now non-clickable
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default InterviewsPage;
