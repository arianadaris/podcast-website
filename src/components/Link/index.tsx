import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';

const StyledLink = styled(RouterLink)<{ hover?: boolean }>`
    color: inherit;
    text-decoration: none;
    padding: 0.5rem;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    transition: 0.15s ease all;

    &:hover {
        background-color: ${({ theme, hover }) => hover ? theme.palette.primary.light : 'initial'};
    }
`;

type LinkProps = {
    children: React.ReactNode;
    to: string;
    hover?: boolean;
    onClick?: () => void;
}

const Link = ({ children, to, hover = false, onClick }: LinkProps) => {
    const theme = useTheme();

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <StyledLink 
            to={to} 
            theme={theme} 
            hover={hover} 
            onClick={handleClick}
        >
            {children}
        </StyledLink>
    );
};

export default Link;