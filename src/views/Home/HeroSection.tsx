import HeroStack from '@/components/HeroSection';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PrimaryButton from '@/components/PrimaryButton';
import Logo from '@/components/Logo';
import EpisodeTile from '@/components/EpisodeTile';
import { useGetEpisodes } from '@/services/rssService';
import Scrollbar from '@/components/Scrollbar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const GlowText = styled(Typography)`
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
    letter-spacing: -0.02em;
`;

const EpisodesContainer = styled(Box)`
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const HeroSection = () => {
    const { data: episodes } = useGetEpisodes();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <HeroStack>
            <Stack 
                direction={isMobile ? "column" : "row"} 
                spacing={8} 
                pt={isMobile ? 18 : 24} 
                pb={isMobile ? 12 : 20} 
                width={isMobile ? '90%' : '75%'} 
                alignSelf="center"
            >
                {isMobile && (
                    <Stack width="100%" alignItems="center">
                        <Logo width={isMobile ? 200 : 300} />
                    </Stack> 
                )}
                <Stack spacing={8} width={isMobile ? "100%" : "60%"} justifyContent="center">
                    <Box>
                        <GlowText variant="h1" textAlign={isMobile ? "center" : "left"} sx={{ fontSize: isMobile ? '3rem' : '4rem', fontWeight: 'bold', mb: 2 }}>
                            808s &<br />Coldtakes
                        </GlowText>
                        <Typography 
                            variant="body1" 
                            textAlign={isMobile ? "center" : "left"}
                            sx={{ 
                                opacity: 0.8,
                                fontSize: isMobile ? '1rem' : '1.1rem',
                                lineHeight: 1.6
                            }}
                        >
                            Hosted by Maxx, Los, Johan, and Brayden, we cover loads of music topics with an emphasis on Hip Hop. Tune in every weekend to hear our takes and discussions about the music industry!
                        </Typography>
                    </Box>
                    <PrimaryButton title="Subscribe to Podcast" onClick={() => {}} center={isMobile} />
                </Stack>
                <Stack spacing={4} width="100%">
                    {!isMobile && (
                        <Stack width="100%" alignItems="center" mb={2}>
                            <Logo width={isMobile ? 200 : 300} />
                        </Stack> 
                    )}
                    <EpisodesContainer>
                        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>Latest Episodes</Typography>
                        <Scrollbar maxHeight={isMobile ? 300 : 400}>
                            <Stack spacing={2}>
                                {episodes?.slice(0, 10).map((episode) => (
                                    <EpisodeTile key={episode.id} episode={episode}/>
                                ))}
                            </Stack>
                        </Scrollbar>
                    </EpisodesContainer>
                </Stack>
            </Stack>
        </HeroStack>
    );
};

export default HeroSection;