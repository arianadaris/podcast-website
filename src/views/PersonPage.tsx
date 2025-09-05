import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Avatar,
  IconButton,
} from '@mui/material';
import { ArrowBack, ArrowForward, Mic } from '@mui/icons-material';
import teamData from '../assets/data/team.json';

const PersonPage: React.FC = () => {
  const { personName } = useParams<{ personName: string }>();
  const navigate = useNavigate();
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Find the person data from team.json by name
  const person = personName ? teamData.find(member => member.name.toLowerCase() === personName.toLowerCase()) : null;
  
  // Reset imageError state when person changes
  React.useEffect(() => {
    setImageError(false);
  }, [person]);
  
  // Get all person names for navigation
  const personNames = teamData.map(member => member.name);
  const currentIndex = person ? personNames.indexOf(person.name) : -1;
  const prevPersonName = currentIndex >= 0 ? personNames[(currentIndex - 1 + personNames.length) % personNames.length] : '';
  const nextPersonName = currentIndex >= 0 ? personNames[(currentIndex + 1) % personNames.length] : '';

  if (!person) {
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
        <Typography variant="h4" sx={{ color: 'black' }}>
          Person not found
        </Typography>
      </Box>
    );
  }

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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/team')}
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
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => navigate(`/person/${prevPersonName}`)}
                sx={{
                  color: 'black',
                  backgroundColor: 'primary.light',
                  border: '1px solid black',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  },
                }}
              >
                <ArrowBack />
              </IconButton>
              <IconButton
                onClick={() => navigate(`/person/${nextPersonName}`)}
                sx={{
                  color: 'black',
                  backgroundColor: 'primary.light',
                  border: '1px solid black',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  },
                }}
              >
                <ArrowForward />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Person Details */}
        <Paper
           sx={{
             backgroundColor: 'primary.light',
             border: '2px solid black',
             borderRadius: 0,
             padding: 4,
           }}
         >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
              {/* Image with Microphone Overlay */}
               <Box sx={{ 
                 flex: { xs: 'none', md: '0 0 200px' }, 
                 textAlign: 'center', 
                 position: 'relative' 
               }}>
                 {!imageError ? (
                   <Box sx={{ position: 'relative' }}>
                     <Box
                       component="img"
                       src={person.image}
                       alt={person.name}
                       onError={handleImageError}
                       sx={{
                         width: 200,
                         height: 200,
                         border: '2px solid black',
                         objectFit: 'cover',
                       }}
                     />
                     <IconButton
                       sx={{
                         position: 'absolute',
                         top: 8,
                         right: 8,
                         color: 'black',
                         backgroundColor: 'primary.light',
                         border: '1px solid black',
                         display: { xs: 'none', md: 'flex' }
                       }}
                     >
                       <Mic />
                     </IconButton>
                   </Box>
                 ) : (
                   <Box sx={{ position: 'relative' }}>
                     <Avatar
                       sx={{
                         width: 200,
                         height: 200,
                         border: '2px solid black',
                         borderRadius: 0,
                         backgroundColor: 'rgba(0,0,0,0.1)',
                         fontSize: '5rem',
                         color: 'black',
                         margin: '0 auto',
                       }}
                     >
                       {person.name.split(' ').map(n => n[0]).join('')}
                     </Avatar>
                     <IconButton
                       sx={{
                         position: 'absolute',
                         top: 8,
                         right: 8,
                         color: 'black',
                         backgroundColor: 'primary.light',
                         border: '1px solid black',
                         display: { xs: 'none', md: 'flex' }
                        }}
                      >
                        <Mic />
                      </IconButton>
                    </Box>
                  )}
                </Box>
                
                {/* Name, Social Handle, and Bullet Points */}
                <Box sx={{ 
                  flex: { xs: 'none', md: '1' },
                  textAlign: { xs: 'center', md: 'left' }
                }}>
                 <Box sx={{ 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: { xs: 'center', md: 'flex-start' },
                   gap: 1,
                   marginBottom: 1
                 }}>
                   <Typography
                     variant="h4"
                     sx={{
                       color: 'black',
                       fontWeight: 600,
                     }}
                   >
                     {person.name}
                   </Typography>
                   <IconButton
                     sx={{
                       color: 'black',
                       backgroundColor: 'primary.light',
                       border: '1px solid black',
                       display: { xs: 'flex', md: 'none' },
                       '&:hover': {
                         backgroundColor: 'rgba(0,0,0,0.1)',
                       },
                     }}
                   >
                     <Mic />
                   </IconButton>
                 </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'black',
                    opacity: 0.8,
                    marginBottom: 3,
                  }}
                >
                  {person.socialHandle}
                </Typography>
                
                {/* Bullet Point List */}
                <Box component="ul" sx={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  marginBottom: 3,
                  textAlign: { xs: 'center', md: 'left' }
                }}>
                  <Box component="li" sx={{
                    color: 'black',
                    marginBottom: 1,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    '&::before': {
                      content: '"•"',
                      color: 'black',
                      fontWeight: 'bold',
                      marginRight: '8px',
                      fontSize: '1.2rem',
                      lineHeight: 1.4,
                    }
                  }}>
                    <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.4 }}>
                      {person.role}
                    </Typography>
                  </Box>
                  {person.funFacts.map((fact, index) => (
                    <Box component="li" key={index} sx={{
                      color: 'black',
                      marginBottom: 1,
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      '&::before': {
                        content: '"•"',
                        color: 'black',
                        fontWeight: 'bold',
                        marginRight: '8px',
                        fontSize: '1.2rem',
                        lineHeight: 1.4,
                      }
                    }}>
                      <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.4 }}>
                        {fact}
                      </Typography>
                    </Box>
                  ))}
                                 </Box>
               </Box>
             </Box>
             
             {/* Favorite Artists Section */}
             <Box sx={{ marginTop: 4 }}>
               <Typography
                 variant="h6"
                 sx={{
                   color: 'black',
                   fontWeight: 600,
                   marginBottom: 2,
                 }}
               >
                 Favorite Artists
               </Typography>
               <Box sx={{ 
                 display: 'flex', 
                 gap: { xs: 2, sm: 1 },
                 overflowX: { xs: 'auto', sm: 'visible' },
                 paddingBottom: { xs: 1, sm: 0 },
                 '&::-webkit-scrollbar': {
                   height: '4px',
                 },
                 '&::-webkit-scrollbar-track': {
                   backgroundColor: 'rgba(0,0,0,0.1)',
                 },
                 '&::-webkit-scrollbar-thumb': {
                   backgroundColor: 'rgba(0,0,0,0.3)',
                   borderRadius: '2px',
                 },
               }}>
                 {person.favoriteArtists.map((artist, index) => (
                   <Box
                     key={index}
                     sx={{
                       display: 'flex',
                       flexDirection: 'column',
                       alignItems: 'center',
                       flex: { xs: '0 0 auto', sm: 1 },
                       minWidth: { xs: '80px', sm: 'auto' },
                     }}
                   >
                     <Box
                       component="img"
                       src={artist.image}
                       alt={artist.name}
                       sx={{
                         width: { xs: 70, sm: 60 },
                         height: { xs: 70, sm: 60 },
                         border: '1px solid black',
                         objectFit: 'cover',
                         marginBottom: 1,
                       }}
                     />
                     <Typography
                       variant="caption"
                       sx={{
                         color: 'black',
                         textAlign: 'center',
                         fontSize: { xs: '0.75rem', sm: '0.7rem' },
                         lineHeight: 1.2,
                         maxWidth: { xs: '80px', sm: 'none' },
                         overflow: 'hidden',
                         textOverflow: 'ellipsis',
                         whiteSpace: 'nowrap',
                       }}
                     >
                       {artist.name}
                     </Typography>
                   </Box>
                 ))}
               </Box>
             </Box>
             
             {/* Favorite Albums Section */}
             <Box sx={{ marginTop: 4 }}>
               <Typography
                 variant="h6"
                 sx={{
                   color: 'black',
                   fontWeight: 600,
                   marginBottom: 2,
                 }}
               >
                 Favorite Albums
               </Typography>
               <Box sx={{ 
                 display: 'flex', 
                 gap: { xs: 2, sm: 1 },
                 overflowX: { xs: 'auto', sm: 'visible' },
                 paddingBottom: { xs: 1, sm: 0 },
                 '&::-webkit-scrollbar': {
                   height: '4px',
                 },
                 '&::-webkit-scrollbar-track': {
                   backgroundColor: 'rgba(0,0,0,0.1)',
                 },
                 '&::-webkit-scrollbar-thumb': {
                   backgroundColor: 'rgba(0,0,0,0.3)',
                   borderRadius: '2px',
                 },
               }}>
                 {person.favoriteAlbums.map((album, index) => (
                   <Box
                     key={index}
                     sx={{
                       display: 'flex',
                       flexDirection: 'column',
                       alignItems: 'center',
                       flex: { xs: '0 0 auto', sm: 1 },
                       minWidth: { xs: '80px', sm: 'auto' },
                     }}
                   >
                     <Box
                       component="img"
                       src={album.image}
                       alt={album.name}
                       sx={{
                         width: { xs: 70, sm: 60 },
                         height: { xs: 70, sm: 60 },
                         border: '1px solid black',
                         objectFit: 'cover',
                         marginBottom: 1,
                       }}
                     />
                     <Typography
                       variant="caption"
                       sx={{
                         color: 'black',
                         textAlign: 'center',
                         fontSize: { xs: '0.75rem', sm: '0.7rem' },
                         lineHeight: 1.2,
                         maxWidth: { xs: '80px', sm: 'none' },
                         overflow: 'hidden',
                         textOverflow: 'ellipsis',
                         whiteSpace: 'nowrap',
                         marginBottom: 0.5,
                       }}
                     >
                       {album.name}
                     </Typography>
                     <Typography
                       variant="caption"
                       sx={{
                         color: 'black',
                         textAlign: 'center',
                         fontSize: { xs: '0.65rem', sm: '0.6rem' },
                         opacity: 0.8,
                         lineHeight: 1.2,
                         maxWidth: { xs: '80px', sm: 'none' },
                         overflow: 'hidden',
                         textOverflow: 'ellipsis',
                         whiteSpace: 'nowrap',
                       }}
                     >
                       {album.artist}
                     </Typography>
                   </Box>
                 ))}
               </Box>
             </Box>
          </Paper>
      </Container>
    </Box>
  );
};

export default PersonPage;
