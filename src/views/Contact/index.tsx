import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ContactForm from './ContactForm';
import { PageContainer, PageHeader, GlowText, GlassContainer } from '@/themes/shared';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Contact = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <PageContainer 
            pt={24} 
            pb={12} 
            spacing={8} 
            minHeight="85vh" 
            justifyContent="flex-start" 
            alignItems="center"
            sx={{ overflowY: 'auto' }}
        >
            <PageHeader spacing={2} alignSelf="center">
                <Typography 
                    variant="h6" 
                    textAlign="center"
                    sx={{ opacity: 0.7 }}
                >
                    Get in Touch!
                </Typography>
                <GlowText 
                    variant="h1" 
                    textAlign="center"
                    sx={{ 
                        fontSize: isMobile ? '3rem' : '4rem',
                        fontWeight: 'bold'
                    }}
                >
                    Contact
                </GlowText>
            </PageHeader>
            <Stack 
                width={{ xs: '90%', md: '33%' }} 
                alignSelf="center"
                sx={{ mb: 4 }}
            >
                <GlassContainer>
                    <ContactForm />
                </GlassContainer>
            </Stack>
        </PageContainer>
    );
};

export default Contact;