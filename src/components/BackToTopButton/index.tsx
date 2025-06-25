import IconButton from '@mui/material/IconButton';
import NorthIcon from '@mui/icons-material/North';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'; 
import { useState, useEffect } from 'react';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const handleBack = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        isVisible ? (
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                position="fixed"
                bottom='2.5%'
                right='2.5%'
                sx={{
                    animation: `${fadeIn} 0.5s ease-in-out`
                }}
            >
                <IconButton onClick={handleBack}>
                    <Stack alignItems="center">
                        <NorthIcon sx={{ color: 'white' }} />
                        <Typography variant="body2" color="text.primary">Back to Top</Typography>
                    </Stack>
                </IconButton>
            </Stack>
        ) : (<></>)
    );
};

export default BackToTopButton;