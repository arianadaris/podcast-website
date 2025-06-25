import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import ArrowIcon from '@mui/icons-material/NorthEast';
import { SxProps } from '@mui/material';

const StyledButton = styled.button<{center?: boolean; fullWidth?: boolean}>`
    border-radius: 100px;
    border-color: rgba(255, 255, 255, 0.1);
    border-width: 1px;
    border-style: solid;
    border-radius: 100px;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: ${({ fullWidth }) => fullWidth ? '100%' : 'fit-content'};
    padding: 1rem 3rem;
    align-self: ${({ center }) => center ? 'center' : 'flex-start'};
    transition: all 0.3s ease;

    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.palette.primary.light};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
`;

type PrimaryButtonProps = {
    title: string;
    center?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
    sx?: SxProps;
    showArrow?: boolean;
};

const PrimaryButton = ({ 
    title, 
    center = false, 
    disabled, 
    fullWidth,
    onClick, 
    children,
    showArrow = true,
}: PrimaryButtonProps) => {
    const theme = useTheme();

    return (
        <StyledButton 
            onClick={onClick} 
            theme={theme} 
            center={center} 
            disabled={disabled}
            fullWidth={fullWidth}
        >
            <Typography variant="body1" color="text.primary">{title}</Typography>
            {children}
            {showArrow && <ArrowIcon sx={{ color: 'white' }} />}
        </StyledButton>
    );
};

export default PrimaryButton;