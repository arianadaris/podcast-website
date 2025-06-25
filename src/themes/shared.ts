import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export const GlowText = styled(Typography)`
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
    letter-spacing: -0.02em;
`;

export const HighlightText = styled(Typography)`
    background: linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.8) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
`;

export const GlassContainer = styled(Box)`
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const PageContainer = styled(Stack)`
    position: relative;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 200px;
        background: linear-gradient(180deg, rgba(10, 3, 30, 0.8) 0%, rgba(10, 3, 30, 0) 100%);
        pointer-events: none;
        z-index: -1;
    }
`;

export const PageHeader = styled(Stack)`
    margin-bottom: 4rem;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        bottom: -2rem;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 1px;
        background: linear-gradient(90deg, 
            rgba(255, 255, 255, 0) 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            rgba(255, 255, 255, 0) 100%);
    }
`; 