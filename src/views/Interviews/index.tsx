import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageHeader, GlowText, GlassContainer } from '@/themes/shared';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import PrimaryButton from '@/components/PrimaryButton';
import { interviewData } from '@/utils/interviewData';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import YouTubeIcon from '@mui/icons-material/YouTube';
import styled from 'styled-components';

const InterviewCard = styled(GlassContainer)`
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
    width: 100%;

    &:hover {
        transform: translateY(-4px);
    }
`;

const InterviewImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
`;

const Interviews = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const handleBookInterview = () => {
        navigate('/contact?tab=interview');
    };

    const handlePlayInterview = (spotifyUrl: string) => {
        window.open(spotifyUrl, '_blank');
    };

    const handleYouTube = (youtubeUrl: string) => {
        window.open(youtubeUrl, '_blank');
    };

    return (
        <PageContainer 
            pt={isMobile ? 18 : 24} 
            pb={12} 
            spacing={8}
            sx={{ overflowY: 'auto' }}
        >
            <PageHeader spacing={4} alignSelf="center" maxWidth="800px">
                <Typography 
                    variant="h6" 
                    textAlign="center"
                    sx={{ opacity: 0.7 }}
                >
                    Local Artist Spotlight
                </Typography>
                <GlowText 
                    variant="h1" 
                    textAlign="center"
                    sx={{ 
                        fontSize: isMobile ? '3rem' : '4rem',
                        fontWeight: 'bold'
                    }}
                >
                    Interviews
                </GlowText>
                <Typography 
                    variant="body1" 
                    textAlign="center" 
                    color="text.secondary"
                    sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}
                    width={{ xs: '90%' }}
                    alignSelf="center"
                >
                    808s & Mixtapes is dedicated to showcasing the vibrant local music scene. 
                    We sit down with artists from all genres to explore their creative journey, 
                    discuss their influences, and share their unique perspectives on music. 
                    Want to share your story? Book an interview with us today!
                </Typography>
                <PrimaryButton 
                    title="Book an Interview" 
                    onClick={handleBookInterview}
                    center={true}
                />
            </PageHeader>

            <Box sx={{ width: '100%', px: isMobile ? 2 : 8 }}>
                <Grid 
                    container 
                    spacing={4} 
                    justifyContent="center"
                    alignItems="stretch"
                >
                    {interviewData.map((interview) => (
                        <Grid 
                            item 
                            xs={12} 
                            sm={10} 
                            md={6} 
                            lg={4} 
                            key={interview.id}
                            sx={{ 
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <InterviewCard>
                                <InterviewImage src={interview.imageUrl} alt={interview.title} />
                                <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h5" gutterBottom>
                                        {interview.title}
                                    </Typography>
                                    <Typography variant="h6" color="primary" gutterBottom>
                                        {interview.artist}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {interview.date}
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        {interview.description}
                                    </Typography>
                                    <TagsContainer>
                                        {interview.tags.map((tag) => (
                                            <Chip 
                                                key={tag} 
                                                label={tag} 
                                                size="small" 
                                                color="primary" 
                                                variant="outlined"
                                            />
                                        ))}
                                    </TagsContainer>
                                    <Box sx={{ mt: 'auto' }}>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            Highlights:
                                        </Typography>
                                        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.2rem' }}>
                                            {interview.highlights.map((highlight, index) => (
                                                <li key={index}>
                                                    <Typography variant="body2">
                                                        {highlight}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </ul>
                                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                            <PrimaryButton
                                                title="Listen"
                                                onClick={() => handlePlayInterview(interview.spotifyUrl)}
                                                fullWidth
                                                showArrow={false}
                                            >
                                                <PlayArrowIcon sx={{ color: 'white' }} />
                                            </PrimaryButton>
                                            {interview.youtubeUrl && (
                                                <PrimaryButton
                                                    title="Watch"
                                                    onClick={() => handleYouTube(interview.youtubeUrl!)}
                                                    fullWidth
                                                    showArrow={false}
                                                >
                                                    <YouTubeIcon sx={{ color: 'white' }} />
                                                </PrimaryButton>
                                            )}
                                        </Stack>
                                    </Box>
                                </Box>
                            </InterviewCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Interviews; 