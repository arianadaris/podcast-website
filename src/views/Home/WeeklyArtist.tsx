import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PrimaryButton from '@/components/PrimaryButton';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ArtistSection = styled(Box)`
    background: radial-gradient(748.73% 131.32% at 34.71% 54.60%, rgba(30, 32, 75, 0.60) 0%, rgba(0, 0, 0, 0.00) 100%), #0A031E;
    border-radius: 32px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    overflow: hidden;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, 
            rgba(255, 255, 255, 0) 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            rgba(255, 255, 255, 0) 100%);
    }
`;

const HighlightText = styled(Typography)`
    background: linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.8) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
`;

const WeeklyArtist = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <ArtistSection>
            <Grid 
                container 
                spacing={isMobile ? 4 : 8} 
                sx={{ 
                    width: '90%', 
                    margin: '0 auto',
                    py: isMobile ? 6 : 8,
                    px: isMobile ? 2 : 4
                }}
            >
                <Grid item xs={12} md={6}>
                    <Box 
                        sx={{ 
                            height: '100%',
                            minHeight: 300,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* Image or video placeholder */}
                        <Typography variant="h5" sx={{ opacity: 0.5 }}>Artist Image</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 4, 
                        alignItems: isMobile ? 'center' : 'flex-start',
                        height: '100%',
                        justifyContent: 'center'
                    }}>
                        <Box>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    opacity: 0.7,
                                    mb: 1,
                                    textAlign: isMobile ? 'center' : 'left'
                                }}
                            >
                                Latest Artist
                            </Typography>
                            <HighlightText 
                                variant="h1" 
                                sx={{ 
                                    fontSize: isMobile ? '2.5rem' : '3.5rem',
                                    mb: 2,
                                    textAlign: isMobile ? 'center' : 'left'
                                }}
                            >
                                S.A.M.N X
                            </HighlightText>
                            <Typography 
                                variant="body1" 
                                textAlign={isMobile ? 'center' : 'left'}
                                sx={{ 
                                    opacity: 0.8,
                                    fontSize: isMobile ? '1rem' : '1.1rem',
                                    lineHeight: 1.6,
                                    maxWidth: '600px'
                                }}
                            >
                                Local to Arizona, S.A.M.N X is an up-and-coming Hip Hop music group. 808s & Coldtakes is proud to announce the S.A.M.N X documentary, in partnership with Pascal Productions.
                            </Typography>
                        </Box>
                        <PrimaryButton title="Watch Documentary" onClick={() => {}} center={isMobile} />
                    </Box>
                </Grid>
            </Grid>
        </ArtistSection>
    );
};

export default WeeklyArtist;