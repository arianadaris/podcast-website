import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Stack,
} from '@mui/material';
import { ExpandMore, ArrowBack, Send, CheckCircle } from '@mui/icons-material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import Socials from '../components/Socials';
import SuccessDialog from '../components/SuccessDialog';
import { submitNominations, hasUserSubmitted, getNominationSettings } from '../services/nominationService';
import { areNominationsOpen, isValidUrl, getCategoryDisplayName, getCategoryDescription } from '../utils/nominationValidation';
import { NominationCategory } from '../config/supabase';
import { usePageTitle } from '../hooks/usePageTitle';

interface CategoryFormData {
  artist_name: string;
  project_name: string;
  song_name: string;
  video_url: string;
}

interface FormData {
  project_of_the_year: CategoryFormData;
  artist_of_the_year: CategoryFormData;
  group_of_the_year: CategoryFormData;
  song_of_the_year: CategoryFormData;
  producer_of_the_year: CategoryFormData;
  music_video_of_the_year: CategoryFormData;
}

const categories: NominationCategory[] = [
  'project_of_the_year',
  'artist_of_the_year',
  'group_of_the_year',
  'song_of_the_year',
  'producer_of_the_year',
  'music_video_of_the_year',
];

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    border: '2px solid black',
    borderRadius: 0,
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'black',
    fontWeight: 600,
  },
};

const NominationsPage: React.FC = () => {
  usePageTitle('Nominate - 808s Podcast');
  
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  // Watch all form values to show completion indicators
  const watchedValues = useWatch({ control });
  
  // Check if a category has been fully filled out (all relevant fields entered)
  const isCategoryFilled = (category: NominationCategory): boolean => {
    const categoryData = watchedValues[category];
    if (!categoryData?.artist_name?.trim()) return false;
    
    // Check category-specific required fields
    if (category === 'project_of_the_year' || 
        category === 'artist_of_the_year' || 
        category === 'group_of_the_year') {
      return !!(categoryData.project_name?.trim());
    }
    
    if (category === 'song_of_the_year' || 
        category === 'producer_of_the_year' || 
        category === 'music_video_of_the_year') {
      return !!(categoryData.song_name?.trim());
    }
    
    return true;
  };
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [nominationsStatus, setNominationsStatus] = useState<{ isOpen: boolean; message?: string }>({ isOpen: false });
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const submitted = await hasUserSubmitted();
        setAlreadySubmitted(submitted);

        const settings = await getNominationSettings();
        const status = areNominationsOpen(settings);
        setNominationsStatus(status);
      } catch (err) {
        console.error('Error checking nomination status:', err);
        setError('Failed to load nomination status. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, []);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);

    try {
      const nominations: Array<{
        category: NominationCategory;
        artist_name: string;
        project_name?: string;
        song_name?: string;
        video_url?: string;
      }> = [];

      categories.forEach((category) => {
        const categoryData = data[category];
        const hasData = categoryData.artist_name?.trim();
        
        if (hasData) {
          const nomination: any = {
            category,
            artist_name: categoryData.artist_name.trim(),
          };

          if (category === 'project_of_the_year') {
            if (categoryData.project_name?.trim()) {
              nomination.project_name = categoryData.project_name.trim();
            }
          } else if (category === 'artist_of_the_year' || category === 'group_of_the_year') {
            if (categoryData.project_name?.trim()) {
              nomination.project_name = categoryData.project_name.trim();
            }
          } else if (category === 'song_of_the_year') {
            if (categoryData.song_name?.trim()) {
              nomination.song_name = categoryData.song_name.trim();
            }
          } else if (category === 'producer_of_the_year') {
            if (categoryData.song_name?.trim()) {
              nomination.song_name = categoryData.song_name.trim();
            }
          } else if (category === 'music_video_of_the_year') {
            if (categoryData.song_name?.trim()) {
              nomination.song_name = categoryData.song_name.trim();
            }
            if (categoryData.video_url?.trim()) {
              nomination.video_url = categoryData.video_url.trim();
            }
          }

          nominations.push(nomination);
        }
      });

      if (nominations.length === 0) {
        setError('Please nominate at least one category.');
        setSubmitting(false);
        return;
      }

      await submitNominations(nominations);
      setSuccessDialogOpen(true);
    } catch (err: any) {
      console.error('Error submitting nominations:', err);
      setError(err.message || 'Failed to submit nominations. Please try again.');
      setSubmitting(false);
    }
  };

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
    navigate('/main');
  };

  const renderCategoryFields = (category: NominationCategory) => {
    const artistLabel = category === 'group_of_the_year' ? 'Group Name' : 
                       category === 'producer_of_the_year' ? 'Producer Name' : 'Artist Name';

    return (
      <Stack spacing={2}>
        <Controller
          name={`${category}.artist_name`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={artistLabel}
              fullWidth
              variant="outlined"
              sx={textFieldSx}
            />
          )}
        />

        {(category === 'project_of_the_year' || 
          category === 'artist_of_the_year' || 
          category === 'group_of_the_year') && (
          <Controller
            name={`${category}.project_name`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label={category === 'project_of_the_year' ? 'Project Name' : 'Album/Project Name'}
                fullWidth
                variant="outlined"
                sx={textFieldSx}
              />
            )}
          />
        )}

        {(category === 'song_of_the_year' || 
          category === 'producer_of_the_year' || 
          category === 'music_video_of_the_year') && (
          <Controller
            name={`${category}.song_name`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Song Name"
                fullWidth
                variant="outlined"
                sx={textFieldSx}
              />
            )}
          />
        )}

        {category === 'music_video_of_the_year' && (
          <Controller
            name={`${category}.video_url`}
            control={control}
            defaultValue=""
            rules={{
              validate: (value) => {
                if (!value) return true;
                return isValidUrl(value) || 'Please enter a valid URL';
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Video URL (Optional)"
                fullWidth
                variant="outlined"
                error={!!errors[category]?.video_url}
                helperText={errors[category]?.video_url?.message}
                sx={textFieldSx}
              />
            )}
          />
        )}
      </Stack>
    );
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress sx={{ color: 'black' }} />
      </Box>
    );
  }

  // Already submitted state
  if (alreadySubmitted) {
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
                  transform: 'translateX(-50%)',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
                }}
              >
                Nominate
              </Typography>
              <Box sx={{ width: { xs: 60, sm: 80 } }} />
            </Box>
          </Box>

          <Paper sx={{ backgroundColor: 'primary.light', border: '2px solid black', borderRadius: 0, padding: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'black' }}>
              Already Submitted
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'black' }}>
              You have already submitted your nominations. Thank you for participating!
            </Typography>
            <Typography variant="body2" sx={{ color: 'black', opacity: 0.7 }}>
              Come back later to vote for the winners.
            </Typography>
          </Paper>

          <Socials sx={{ marginTop: 3 }} />
        </Container>
      </Box>
    );
  }

  // Nominations closed state
  if (!nominationsStatus.isOpen) {
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
                  transform: 'translateX(-50%)',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
                }}
              >
                Nominate
              </Typography>
              <Box sx={{ width: { xs: 60, sm: 80 } }} />
            </Box>
          </Box>

          <Paper sx={{ backgroundColor: 'primary.light', border: '2px solid black', borderRadius: 0, padding: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'black' }}>
              Nominations Closed
            </Typography>
            <Typography variant="body1" sx={{ color: 'black' }}>
              {nominationsStatus.message || 'Nominations are not currently open.'}
            </Typography>
          </Paper>

          <Socials sx={{ marginTop: 3 }} />
        </Container>
      </Box>
    );
  }

  // Main nominations form
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
                transform: 'translateX(-50%)',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
              }}
            >
              Nominate
            </Typography>
            <Box sx={{ width: { xs: 60, sm: 80 } }} />
          </Box>
        </Box>

        {/* Nominations Form */}
        <Paper sx={{ backgroundColor: 'primary.light', border: '2px solid black', borderRadius: 0 }}>
          <Box sx={{ padding: 3 }}>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', color: 'black' }}>
              Arizona artists! This is your chance to get recognized for all the hard work you've put in this year. 
              Nominate yourself for the 2026 808s Awards Show and let your music be heard. 
              Fill out as many or as few categories as you like. Please note: one song or project per artist—if you submit more than one, your first submission will be used.
            </Typography>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3, 
                  borderRadius: 0,
                  backgroundColor: 'rgba(211, 47, 47, 0.1)',
                  border: '2px solid #d32f2f',
                }}
                onClose={() => setError(null)}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                {categories.map((category) => (
                  <Accordion
                    key={category}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      border: '2px solid black',
                      borderRadius: 0,
                      '&:before': {
                        display: 'none',
                      },
                      boxShadow: 'none',
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore sx={{ color: 'black' }} />}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.05)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
                        {isCategoryFilled(category) && (
                          <CheckCircle 
                            sx={{ 
                              color: '#2e7d32',
                              fontSize: 28,
                              flexShrink: 0,
                            }} 
                          />
                        )}
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'black' }}>
                            {getCategoryDisplayName(category)}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'black', opacity: 0.7 }}>
                            {getCategoryDescription(category)}
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ borderTop: '1px solid rgba(0,0,0,0.1)', pt: 2 }}>
                      {renderCategoryFields(category)}
                    </AccordionDetails>
                  </Accordion>
                ))}

                <Button
                  type="submit"
                  variant="contained"
                  startIcon={submitting ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Send />}
                  disabled={submitting}
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    border: '2px solid black',
                    borderRadius: 0,
                    fontWeight: 600,
                    padding: '12px 24px',
                    marginTop: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.8)',
                    },
                    '&:disabled': {
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      color: 'rgba(255,255,255,0.5)',
                    },
                  }}
                >
                  {submitting ? 'Submitting...' : 'Submit Nominations'}
                </Button>
              </Stack>
            </form>
          </Box>
        </Paper>

        {/* Social Links */}
        <Socials sx={{ marginTop: 3 }} />
      </Container>

      <SuccessDialog
        open={successDialogOpen}
        onClose={handleSuccessDialogClose}
        title="Thank You for Nominating!"
        message="Your nominations have been submitted successfully. Come back later to vote for the winners!"
        buttonText="Back to Home"
      />
    </Box>
  );
};

export default NominationsPage;
