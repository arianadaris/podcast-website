import React from 'react';
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

interface PersonPageProps {
  personId: string;
  onBack: () => void;
  onNavigateToPerson: (personId: string) => void;
}

const PersonPage: React.FC<PersonPageProps> = ({ personId, onBack, onNavigateToPerson }) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  // This would typically come from a database or API
  const personData = {
    person1: {
      name: 'Alex Johnson',
      image: '/images/person1.jpg',
      role: 'Host & Producer',
      socialHandle: '@alexjohnson',
      bio: 'Alex is the creative force behind 808s & COLD TAKES. With over 10 years of experience in music production and podcasting, Alex brings a unique perspective to every episode. When not behind the mic, you can find Alex exploring new music genres and mentoring up-and-coming artists.',
      funFacts: [
        'Can play 7 different instruments',
        'Once interviewed a Grammy winner in a coffee shop'
      ],
      favoriteArtists: [
        { name: 'Kendrick Lamar', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Daft Punk', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Radiohead', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Flying Lotus', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'J Dilla', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' }
      ],
      favoriteAlbums: [
        { name: 'To Pimp A Butterfly', artist: 'Kendrick Lamar', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'Random Access Memories', artist: 'Daft Punk', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'OK Computer', artist: 'Radiohead', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'Cosmogramma', artist: 'Flying Lotus', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'Donuts', artist: 'J Dilla', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' }
      ],
    },
    person2: {
      name: 'Sarah Chen',
      image: '/images/person2.jpg',
      role: 'Co-Host & Music Director',
      socialHandle: '@sarahchen_music',
      bio: 'Sarah brings her expertise in music theory and industry knowledge to every discussion. With a background in music journalism and A&R, Sarah has an uncanny ability to spot emerging talent and trends before they hit the mainstream.',
      funFacts: [
        'Has perfect pitch',
        'Discovered 3 artists who went on to win awards'
      ],
      favoriteArtists: [
        { name: 'Kendrick Lamar', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Daft Punk', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Radiohead', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Flying Lotus', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'J Dilla', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' }
      ],
      favoriteAlbums: [
        { name: 'To Pimp A Butterfly', artist: 'Kendrick Lamar', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'Random Access Memories', artist: 'Daft Punk', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'OK Computer', artist: 'Radiohead', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'Cosmogramma', artist: 'Flying Lotus', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'Donuts', artist: 'J Dilla', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' }
      ],
    },
    person3: {
      name: 'Mike Rodriguez',
      image: '/images/person3.jpg',
      role: 'Technical Producer',
      socialHandle: '@mikerodriguez_tech',
      bio: 'Mike handles all the technical aspects of the podcast, from sound engineering to post-production. His attention to detail ensures that every episode sounds professional and polished. Mike also contributes to the creative direction with his deep knowledge of music technology.',
      funFacts: [
        'Built his first synthesizer at age 16',
        'Can identify any song by its waveform'
      ],
      favoriteArtists: [
        { name: 'Kendrick Lamar', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Daft Punk', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Radiohead', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Flying Lotus', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'J Dilla', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' }
      ],
      favoriteAlbums: [
        { name: 'To Pimp A Butterfly', artist: 'Kendrick Lamar', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'Random Access Memories', artist: 'Daft Punk', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'OK Computer', artist: 'Radiohead', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'Cosmogramma', artist: 'Flying Lotus', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'Donuts', artist: 'J Dilla', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' }
      ],
    },
    person4: {
      name: 'Emily Davis',
      image: '/images/person4.jpg',
      role: 'Content Strategist',
      socialHandle: '@emilydavis_content',
      bio: 'Emily oversees the content strategy and guest booking for the podcast. With her background in music marketing and public relations, Emily ensures that every episode delivers value to our listeners and maintains the high standards of 808s & COLD TAKES.',
      funFacts: [
        'Has attended over 500 live concerts',
        'Once got backstage at a major festival using only a smile'
      ],
      favoriteArtists: [
        { name: 'Kendrick Lamar', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Daft Punk', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Radiohead', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Flying Lotus', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'J Dilla', image: 'https://yt3.googleusercontent.com/ok2wg2JCipAWv4vYKnjDDx2qwOjYwbsBhvaBX3lTH7GHcXZCRedTtE8xRyVt1LFdn5rqRB-R=s900-c-k-c0x00ffffff-no-rj' }
      ],
      favoriteAlbums: [
        { name: 'To Pimp A Butterfly', artist: 'Kendrick Lamar', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'Random Access Memories', artist: 'Daft Punk', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'OK Computer', artist: 'Radiohead', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'Cosmogramma', artist: 'Flying Lotus', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' },
        { name: 'Donuts', artist: 'J Dilla', image: 'https://images.genius.com/ef46a8b00403a653ce236f664bb6fc42.700x700x1.jpg' }
      ],
    },
  };

  const person = personData[personId as keyof typeof personData];
  
  // Get all person IDs for navigation
  const personIds = Object.keys(personData);
  const currentIndex = personIds.indexOf(personId);
  const prevPersonId = personIds[(currentIndex - 1 + personIds.length) % personIds.length];
  const nextPersonId = personIds[(currentIndex + 1) % personIds.length];

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
            sx={{
              width: 150,
              height: 150,
              margin: '0 auto 16px',
              display: 'block',
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => onNavigateToPerson(prevPersonId)}
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
                onClick={() => onNavigateToPerson(nextPersonId)}
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
                         display: { xs: 'none', md: 'flex' },
                         '&:hover': {
                           backgroundColor: 'rgba(0,0,0,0.1)',
                         },
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
                         display: { xs: 'none', md: 'flex' },
                         '&:hover': {
                           backgroundColor: 'rgba(0,0,0,0.1)',
                         },
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
