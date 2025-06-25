import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HeroSection from '@/components/HeroSection';
import Socials from '@/components/Socials';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <HeroSection>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%" px={{ xs: 8, md: 32 }} py={8}>
                {!isMobile && (
                    <Typography variant="h5" sx={{ lineHeight: 0.8 }}>808s &<br></br>Coldtakes</Typography>
                )}
                <Socials sx={{ ml: isMobile ? 'auto' : 0, mr: isMobile ? 'auto' : 0 }} />
            </Stack>
        </HeroSection>
    );
};

export default Footer;