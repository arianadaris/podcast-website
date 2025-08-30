import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Paper,
  Stack,
} from '@mui/material';
import {
  ArrowBack,
  Send,
  CalendarToday,
} from '@mui/icons-material';

interface ContactPageProps {
  onBack: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`contact-tabpanel-${index}`}
      aria-labelledby={`contact-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [tabValue, setTabValue] = useState(0);
  const [generalForm, setGeneralForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [interviewForm, setInterviewForm] = useState({
    name: '',
    email: '',
    socialMediaLinks: '',
    musicLinks: '',
    aboutYourself: '',
    preferredDates: '',
    message: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleGeneralFormChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralForm({
      ...generalForm,
      [field]: event.target.value,
    });
  };

  const handleInterviewFormChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterviewForm({
      ...interviewForm,
      [field]: event.target.value,
    });
  };

  const handleSendMessage = () => {
    // TODO: Implement send message functionality
    console.log('Sending general message:', generalForm);
  };

  const handleBookInterview = () => {
    // TODO: Implement book interview functionality
    console.log('Booking interview:', interviewForm);
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
              Contact
            </Typography>
          </Box>
        </Box>

        {/* Tabs */}
        <Paper sx={{ backgroundColor: 'primary.light', border: '2px solid black', borderRadius: 0 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              borderBottom: '2px solid black',
              '& .MuiTab-root': {
                color: 'black',
                fontWeight: 600,
                '&.Mui-selected': {
                  color: 'black',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'black',
                height: 3,
              },
            }}
          >
            <Tab label="General Contact" />
            <Tab label="Book Interview" />
          </Tabs>

          {/* General Contact Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ padding: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Name"
                  value={generalForm.name}
                  onChange={handleGeneralFormChange('name')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      border: '2px solid black',
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
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={generalForm.email}
                  onChange={handleGeneralFormChange('email')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      border: '2px solid black',
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
                  }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  value={generalForm.message}
                  onChange={handleGeneralFormChange('message')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      border: '2px solid black',
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
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<Send />}
                  onClick={handleSendMessage}
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    border: '2px solid black',
                    fontWeight: 600,
                    padding: '12px 24px',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.8)',
                    },
                  }}
                >
                  Send Message
                </Button>
              </Stack>
            </Box>
          </TabPanel>

          {/* Book Interview Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ padding: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Name"
                  value={interviewForm.name}
                  onChange={handleInterviewFormChange('name')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      border: '2px solid black',
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
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={interviewForm.email}
                  onChange={handleInterviewFormChange('email')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      border: '2px solid black',
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
                  }}
                />
                <TextField
                  fullWidth
                  label="Social Media Links"
                  value={interviewForm.socialMediaLinks}
                  onChange={handleInterviewFormChange('socialMediaLinks')}
                  placeholder="Instagram, Twitter, TikTok, etc."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      border: '2px solid black',
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
                  }}
                />
                <TextField
                  fullWidth
                  label="Music Links"
                  value={interviewForm.musicLinks}
                  onChange={handleInterviewFormChange('musicLinks')}
                  placeholder="Spotify, SoundCloud, YouTube, etc."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      border: '2px solid black',
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
                  }}
                />
                <TextField
                  fullWidth
                  label="Tell us about yourself"
                  multiline
                  rows={3}
                  value={interviewForm.aboutYourself}
                  onChange={handleInterviewFormChange('aboutYourself')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      border: '2px solid black',
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
                  }}
                />
                <TextField
                  fullWidth
                  label="Preferred Interview Dates"
                  value={interviewForm.preferredDates}
                  onChange={handleInterviewFormChange('preferredDates')}
                  placeholder="e.g., Weekdays after 6 PM, Weekends anytime"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      border: '2px solid black',
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
                  }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  value={interviewForm.message}
                  onChange={handleInterviewFormChange('message')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      border: '2px solid black',
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
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<CalendarToday />}
                  onClick={handleBookInterview}
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    border: '2px solid black',
                    fontWeight: 600,
                    padding: '12px 24px',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.8)',
                    },
                  }}
                >
                  Book Interview
                </Button>
              </Stack>
            </Box>
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactPage;
