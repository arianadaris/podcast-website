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
        { name: 'Kendrick Lamar', image: '/images/artists/kendrick.jpg' },
        { name: 'Daft Punk', image: '/images/artists/daftpunk.jpg' },
        { name: 'Radiohead', image: '/images/artists/radiohead.jpg' },
        { name: 'Flying Lotus', image: '/images/artists/flyinglotus.jpg' },
        { name: 'J Dilla', image: '/images/artists/jdilla.jpg' }
      ],
      favoriteAlbums: [
        { name: 'To Pimp A Butterfly', artist: 'Kendrick Lamar', image: '/images/albums/tpab.jpg' },
        { name: 'Random Access Memories', artist: 'Daft Punk', image: '/images/albums/ram.jpg' },
        { name: 'OK Computer', artist: 'Radiohead', image: '/images/albums/okcomputer.jpg' },
        { name: 'Cosmogramma', artist: 'Flying Lotus', image: '/images/albums/cosmogramma.jpg' },
        { name: 'Donuts', artist: 'J Dilla', image: '/images/albums/donuts.jpg' }
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
        { name: 'Björk', image: '/images/artists/bjork.jpg' },
        { name: 'Aphex Twin', image: '/images/artists/aphextwin.jpg' },
        { name: 'Portishead', image: '/images/artists/portishead.jpg' },
        { name: 'Massive Attack', image: '/images/artists/massiveattack.jpg' },
        { name: 'The xx', image: '/images/artists/thexx.jpg' }
      ],
      favoriteAlbums: [
        { name: 'Homogenic', artist: 'Björk', image: '/images/albums/homogenic.jpg' },
        { name: 'Selected Ambient Works 85-92', artist: 'Aphex Twin', image: '/images/albums/saw.jpg' },
        { name: 'Dummy', artist: 'Portishead', image: '/images/albums/dummy.jpg' },
        { name: 'Mezzanine', artist: 'Massive Attack', image: '/images/albums/mezzanine.jpg' },
        { name: 'xx', artist: 'The xx', image: '/images/albums/xx.jpg' }
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
        { name: 'Nine Inch Nails', image: '/images/artists/nin.jpg' },
        { name: 'Tool', image: '/images/artists/tool.jpg' },
        { name: 'Depeche Mode', image: '/images/artists/depechemode.jpg' },
        { name: 'Kraftwerk', image: '/images/artists/kraftwerk.jpg' },
        { name: 'Pink Floyd', image: '/images/artists/pinkfloyd.jpg' }
      ],
      favoriteAlbums: [
        { name: 'The Downward Spiral', artist: 'Nine Inch Nails', image: '/images/albums/downwardspiral.jpg' },
        { name: 'Lateralus', artist: 'Tool', image: '/images/albums/lateralus.jpg' },
        { name: 'Violator', artist: 'Depeche Mode', image: '/images/albums/violator.jpg' },
        { name: 'Trans-Europe Express', artist: 'Kraftwerk', image: '/images/albums/trans.jpg' },
        { name: 'Dark Side of the Moon', artist: 'Pink Floyd', image: '/images/albums/darkside.jpg' }
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
        { name: 'The Weeknd', image: '/images/artists/theweeknd.jpg' },
        { name: 'Lorde', image: '/images/artists/lorde.jpg' },
        { name: 'Frank Ocean', image: '/images/artists/frankocean.jpg' },
        { name: 'SZA', image: '/images/artists/sza.jpg' },
        { name: 'Tyler, The Creator', image: '/images/artists/tyler.jpg' }
      ],
      favoriteAlbums: [
        { name: 'After Hours', artist: 'The Weeknd', image: '/images/albums/afterhours.jpg' },
        { name: 'Melodrama', artist: 'Lorde', image: '/images/albums/melodrama.jpg' },
        { name: 'Blonde', artist: 'Frank Ocean', image: '/images/albums/blonde.jpg' },
        { name: 'Ctrl', artist: 'SZA', image: '/images/albums/ctrl.jpg' },
        { name: 'IGOR', artist: 'Tyler, The Creator', image: '/images/albums/igor.jpg' }
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
               <Box sx={{ flex: { xs: 'none', md: '0 0 200px' }, textAlign: 'center', position: 'relative' }}>
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
                <Box sx={{ flex: { xs: 'none', md: '1' } }}>
                 <Typography
                   variant="h4"
                   sx={{
                     color: 'black',
                     fontWeight: 600,
                     marginBottom: 1,
                   }}
                 >
                   {person.name}
                 </Typography>
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
                }}>
                  <Box component="li" sx={{
                    color: 'black',
                    marginBottom: 1,
                    display: 'flex',
                    alignItems: 'flex-start',
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
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 {person.favoriteArtists.map((artist, index) => (
                   <Box
                     key={index}
                     sx={{
                       display: 'flex',
                       flexDirection: 'column',
                       alignItems: 'center',
                       flex: 1,
                     }}
                   >
                     <Box
                       component="img"
                       src={artist.image}
                       alt={artist.name}
                       sx={{
                         width: 60,
                         height: 60,
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
                         fontSize: '0.7rem',
                         lineHeight: 1.2,
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
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 {person.favoriteAlbums.map((album, index) => (
                   <Box
                     key={index}
                     sx={{
                       display: 'flex',
                       flexDirection: 'column',
                       alignItems: 'center',
                       flex: 1,
                     }}
                   >
                     <Box
                       component="img"
                       src={album.image}
                       alt={album.name}
                       sx={{
                         width: 60,
                         height: 60,
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
                         fontSize: '0.7rem',
                         lineHeight: 1.2,
                       }}
                     >
                       {album.name}
                     </Typography>
                     <Typography
                       variant="caption"
                       sx={{
                         color: 'black',
                         textAlign: 'center',
                         fontSize: '0.6rem',
                         opacity: 0.8,
                         lineHeight: 1.2,
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
