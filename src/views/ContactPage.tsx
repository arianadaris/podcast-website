import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import Socials from '../components/Socials';

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

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [generalForm, setGeneralForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [interviewForm, setInterviewForm] = useState({
    officialName: '',
    email: '',
    musicWorkExample: '',
    availability: '',
    specificTopics: '',
    previousInterviews: '',
    additionalDetails: '',
  });
  const [interviewSubmitted, setInterviewSubmitted] = useState(false);

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

  const handleRequestInterview = () => {
    // TODO: Implement request interview functionality
    console.log('Booking interview:', interviewForm);
    setInterviewSubmitted(true);
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
            <Tab label="Request Interview" />
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
                    borderRadius: 0,
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

          {/* Request Interview Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ paddingX: 3, paddingY: 1.5 }}>
              {interviewSubmitted ? (
                <Box sx={{ textAlign: 'center', padding: 4 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: 'black', 
                      fontWeight: 600, 
                      marginBottom: 2 
                    }}
                  >
                    Thank you for filling out our interview form!
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ color: 'black' }}
                  >
                    We will be in touch when it is close to your turn for an interview.
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={3}>
                  <Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'black', 
                        fontWeight: 600, 
                        marginBottom: 1 
                      }}
                    >
                      What is your official name or stage name?
                    </Typography>
                    <TextField
                      fullWidth
                      value={interviewForm.officialName}
                      placeholder="Enter your official name or stage name"
                      onChange={handleInterviewFormChange('officialName')}
                      sx={{
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
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'black', 
                        fontWeight: 600, 
                        marginBottom: 1 
                      }}
                    >
                      What is your email address?
                    </Typography>
                    <TextField
                      fullWidth
                      type="email"
                      value={interviewForm.email}
                      placeholder="Enter your email address"
                      onChange={handleInterviewFormChange('email')}
                      sx={{
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
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'black', 
                        fontWeight: 600, 
                        marginBottom: 1 
                      }}
                    >
                      Please provide examples of your music or work (URL links)
                    </Typography>
                    <TextField
                      fullWidth
                      value={interviewForm.musicWorkExample}
                      onChange={handleInterviewFormChange('musicWorkExample')}
                      placeholder="Spotify, SoundCloud, YouTube, portfolio links, etc."
                      sx={{
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
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'black', 
                        fontWeight: 600, 
                        marginBottom: 1 
                      }}
                    >
                      What is your availability for scheduling an interview?
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      value={interviewForm.availability}
                      onChange={handleInterviewFormChange('availability')}
                      placeholder="Please specify preferred days of the week and times of day"
                      sx={{
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
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'black', 
                        fontWeight: 600, 
                        marginBottom: 1 
                      }}
                    >
                      Are there any specific topics you would like us to discuss or promote during the interview?
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={interviewForm.specificTopics}
                      onChange={handleInterviewFormChange('specificTopics')}
                      placeholder="Upcoming projects, releases, achievements, or other topics you'd like to highlight"
                      sx={{
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
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'black', 
                        fontWeight: 600, 
                        marginBottom: 1 
                      }}
                    >
                      Have you been featured in previous interviews or publications?
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={interviewForm.previousInterviews}
                      onChange={handleInterviewFormChange('previousInterviews')}
                      placeholder="Please share links to help us create fresh and unique content for your interview"
                      sx={{
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
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'black', 
                        fontWeight: 600, 
                        marginBottom: 1 
                      }}
                    >
                      Is there anything else you would like us to know or cover in the interview?
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      value={interviewForm.additionalDetails}
                      onChange={handleInterviewFormChange('additionalDetails')}
                      placeholder="Additional background information, achievements, or topics you'd like to discuss"
                      sx={{
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
                      }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<CalendarToday />}
                    onClick={handleRequestInterview}
                    sx={{
                      backgroundColor: 'black',
                      color: 'white',
                      border: '2px solid black',
                      borderRadius: 0,
                      fontWeight: 600,
                      padding: '12px 24px',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                      },
                    }}
                  >
                    Request Interview
                  </Button>
                </Stack>
              )}
            </Box>
          </TabPanel>
        </Paper>

        {/* Social Links */}
        <Socials sx={{ marginTop: 3 }} />
      </Container>
    </Box>
  );
};

export default ContactPage;
