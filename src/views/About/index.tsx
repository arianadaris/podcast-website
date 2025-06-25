import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TeamCard from '@/components/TeamCard';
import Box from '@mui/material/Box';
import { PageContainer, PageHeader, GlowText } from '@/themes/shared';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { teamData } from '@/utils/teamData';

const About = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <PageContainer alignItems="center" justifyContent="center" pt={24} pb={12} spacing={12}>
            <PageHeader spacing={2} alignSelf="center">
                <Typography 
                    variant="h6" 
                    textAlign="center"
                    sx={{ opacity: 0.7 }}
                >
                    Welcome To
                </Typography>
                <GlowText 
                    variant="h1" 
                    textAlign="center"
                    sx={{ 
                        fontSize: isMobile ? '3rem' : '4rem',
                        fontWeight: 'bold'
                    }}
                >
                    808s & Coldtakes
                </GlowText>
            </PageHeader>
            
            <Typography 
                variant="body1" 
                width={{ xs: '90%', md: '50%' }} 
                alignSelf="center" 
                align="center"
                sx={{ 
                    opacity: 0.8,
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    lineHeight: 1.6
                }}
            >
                808s and Coldtakes are a group of friends who love discussing music topics and bringing light to phenomenal local artists in our communities. Our passion for music drives us to explore various genres and share our insights with our audience.
            </Typography>
            <Box width="100%" display="flex" justifyContent="center">
                <Grid 
                    container 
                    spacing={isMobile ? 4 : 8} 
                    sx={{ 
                        width: isMobile ? '90%' : '85%',
                        mt: 4 
                    }}
                >
                    {Object.values(teamData).map((member) => (
                        <Grid item xs={12} sm={6} md={3} key={member.id}>
                            <TeamCard
                                name={member.name}
                                role={member.role}
                                image={member.avatar}
                                slug={member.slug}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default About;