import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PrimaryButton from '@/components/PrimaryButton';
import { useEffect } from 'react';

const Error = () => {
    useEffect(() => {
        // Hide the scrollbar
        document.body.style.overflow = 'hidden';

        // Cleanup function to reset the overflow style
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleGoToHome = () => {
        window.location.href = '/';
    }

    return (
        <Stack spacing={4} width="100%" justifyContent="center" alignItems="center" alignSelf="center" minHeight="85vh" pt={24} pb={12}>
            <Typography variant="h1" align="center">404</Typography>
            <Typography variant="h6" align="center">Page Not Found</Typography>
            <PrimaryButton title="Go to Home" onClick={handleGoToHome} center={true} />
        </Stack>
    );
};

export default Error;