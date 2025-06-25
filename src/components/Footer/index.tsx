import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HeroSection from '@/components/HeroSection';
import Socials from '@/components/Socials';

const Footer = () => {
    return (
        <HeroSection>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%" px={{ xs: 8, md: 32 }} py={8}>
                <Typography variant="h5" sx={{ lineHeight: 0.8 }}>808s &<br></br>Coldtakes</Typography>
                <Socials />
            </Stack>
        </HeroSection>
    );
};

export default Footer;