import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Button,
  Stack,
  Pagination,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Search,
  PlayArrow,
  ArrowBack,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { fetchEpisodes, Episode } from '../services/rssService';

interface EpisodesPageProps {
  onBack: () => void;
}



const EpisodesPage: React.FC<EpisodesPageProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const episodesPerPage = 10;

  // Fetch episodes on component mount
  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedEpisodes = await fetchEpisodes();
        setEpisodes(fetchedEpisodes);
      } catch (err) {
        setError('Failed to load episodes. Please try again later.');
        console.error('Error loading episodes:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEpisodes();
  }, []);

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter episodes based on search term
  const filteredEpisodes = episodes.filter((episode: Episode) =>
    episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    episode.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredEpisodes.length / episodesPerPage);
  const startIndex = (currentPage - 1) * episodesPerPage;
  const endIndex = startIndex + episodesPerPage;
  const currentEpisodes = filteredEpisodes.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handlePlayEpisode = (episode: Episode) => {
    // TODO: Implement audio playback functionality
    console.log('Playing episode:', episode.title);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
              Episodes
            </Typography>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{ marginBottom: 4 }}>
          <TextField
            fullWidth
            placeholder="Search episodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'black' }} />
                </InputAdornment>
              ),
              sx: {
                border: '2px solid black',
                borderRadius: 0,
                backgroundColor: 'primary.light',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
              },
            }}
          />
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 4 }}>
            <CircularProgress sx={{ color: 'black' }} />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Box sx={{ marginY: 4 }}>
            <Alert severity="error" sx={{ backgroundColor: 'primary.light', color: 'black' }}>
              {error}
            </Alert>
          </Box>
        )}

        {/* Episodes Grid */}
        {!loading && !error && (
          <Stack spacing={3} sx={{ marginBottom: 4 }}>
            {currentEpisodes.map((episode: Episode) => (
            <Card
              key={episode.id}
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
                 <Box sx={{ 
                   display: { xs: 'flex', md: 'none' }, 
                   flexDirection: 'column', 
                   alignItems: 'center',
                   textAlign: 'center'
                 }}>
                   {/* Episode Image Container with Overlay Play Button */}
                   <Box sx={{ position: 'relative', marginBottom: 2 }}>
                     <Box
                       component="img"
                       src={episode.imageUrl || '/logo.png'}
                       alt={`${episode.title} thumbnail`}
                       sx={{
                         width: { xs: 200, sm: 180 },
                         height: { xs: 200, sm: 180 },
                         border: '2px solid black',
                         borderRadius: 0,
                         objectFit: 'cover',
                       }}
                       onError={(e) => {
                         // Fallback to logo if image fails to load
                         const target = e.target as HTMLImageElement;
                         target.src = '/logo.png';
                       }}
                     />
                     {/* Play Button Overlay - Bottom Right Corner */}
                     <IconButton
                       onClick={() => handlePlayEpisode(episode)}
                       sx={{
                         position: 'absolute',
                         bottom: 15,
                         right: 8,
                         border: '2px solid black',
                         color: 'black',
                         width: 48,
                         height: 48,
                         backgroundColor: 'rgba(255, 255, 255, 0.75)',
                         '&:hover': {
                           backgroundColor: 'rgba(255, 255, 255, 1)',
                         },
                         transition: 'all 0.2s ease',
                       }}
                     >
                       <PlayArrow sx={{ fontSize: 24 }} />
                     </IconButton>
                   </Box>
                   
                   {/* Content Below Image on Mobile */}
                   <Box sx={{ width: '100%' }}>
                     <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: 600 }}>
                       {episode.title}
                     </Typography>
                     <Typography variant="body1" sx={{ marginBottom: 2 }}>
                       {episode.description}
                     </Typography>
                     <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                       <Chip
                         label={formatDate(episode.date)}
                         size="small"
                         sx={{ backgroundColor: 'transparent', border: '2px solid black', color: 'black' }}
                       />
                       <Chip
                         label={episode.length}
                         size="small"
                         variant="outlined"
                         sx={{ border: '2px solid black', color: 'black' }}
                       />
                     </Stack>
                   </Box>
                 </Box>

                {/* Desktop Layout */}
                <Box sx={{ 
                  display: { xs: 'none', md: 'flex' }, 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  marginBottom: 2 
                }}>
                  {/* Episode Image */}
                  <Box
                    component="img"
                    src={episode.imageUrl || '/logo.png'}
                    alt={`${episode.title} thumbnail`}
                    sx={{
                      width: 120,
                      height: 120,
                      border: '2px solid black',
                      borderRadius: 0,
                      marginRight: 3,
                      flexShrink: 0,
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      // Fallback to logo if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = '/logo.png';
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: 600 }}>
                      {episode.title}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                      {episode.description}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Chip
                        label={formatDate(episode.date)}
                        size="small"
                        sx={{ backgroundColor: 'transparent', border: '2px solid black', color: 'black' }}
                      />
                      <Chip
                        label={episode.length}
                        size="small"
                        variant="outlined"
                        sx={{ border: '2px solid black', color: 'black' }}
                      />
                    </Stack>
                  </Box>
                  <IconButton
                    onClick={() => handlePlayEpisode(episode)}
                    sx={{
                      border: '2px solid black',
                      color: 'black',
                      width: 56,
                      height: 56,
                      marginLeft: 2,
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <PlayArrow sx={{ fontSize: 28 }} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
          </Stack>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'black',
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                    border: '2px solid black',
                    color: 'black',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                },
              }}
            />
          </Box>
        )}

        {/* No Results Message */}
        {!loading && !error && filteredEpisodes.length === 0 && (
          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Typography variant="h6" sx={{ color: 'black' }}>
              No episodes found matching your search.
            </Typography>
          </Box>
                 )}

        {/* Back to Top Button */}
        {showBackToTop && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000,
            }}
          >
            <Button
              onClick={handleBackToTop}
              sx={{
                backgroundColor: 'transparent',
                color: 'black',
                padding: '8px 16px',
                textTransform: 'none',
                fontWeight: 600,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0,
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <KeyboardArrowUp sx={{ fontSize: 20 }} />
              Back to Top
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default EpisodesPage;
