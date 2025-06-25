import Stack from '@mui/material/Stack';
import Link from '@/components/Link';
import styled from 'styled-components';
import { useState, MouseEvent } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledNav = styled(Stack)`
    border-radius: 100px;
    border-color: rgba(255, 255, 255, 0.1);
    border-width: 1px;
    border-style: solid;
    border-radius: 100px;
`;

const StyledButton = styled(Button)`
    color: white;
    text-transform: none;
    padding: 0.5rem;
    border-radius: 100px;
    min-width: 0;
    font-family: inherit;
    font-size: inherit;

    &:hover {
        background-color: ${({ theme }) => theme.palette.primary.light};
    }
`;

const Nav = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (path: string) => {
        navigate(path);
        handleClose();
    };

    const handleNavClick = (path: string) => {
        navigate(path);
    };

    return (
        <StyledNav direction="row" spacing={8} px={4} py={1}>
            <StyledButton
                onClick={() => handleNavClick('/about')}
                theme={theme}
            >
                About
            </StyledButton>
            <StyledButton
                onClick={() => handleNavClick('/episodes')}
                theme={theme}
            >
                Episodes
            </StyledButton>
            <StyledButton
                id="media-button"
                aria-controls={open ? 'media-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                theme={theme}
            >
                Media
            </StyledButton>
            <Menu
                id="media-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'media-button',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: 'rgba(10, 3, 30, 0.95)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        marginTop: '0.5rem',
                        minWidth: '160px',
                    },
                }}
            >
                <MenuItem 
                    onClick={() => handleMenuItemClick('/media/interviews')}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.light,
                        },
                    }}
                >
                    Interviews
                </MenuItem>
                <MenuItem 
                    onClick={() => handleMenuItemClick('/media/events')}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.light,
                        },
                    }}
                >
                    Events
                </MenuItem>
                {/* Temporarily hidden - Projects
                <MenuItem 
                    onClick={() => handleMenuItemClick('/media/projects')}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.light,
                        },
                    }}
                >
                    Projects
                </MenuItem>
                */}
                {/* Temporarily hidden - 808s on Cam
                <MenuItem 
                    onClick={() => handleMenuItemClick('/media/808s-on-cam')}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.light,
                        },
                    }}
                >
                    808s on Cam
                </MenuItem>
                */}
            </Menu>
            <StyledButton
                onClick={() => handleNavClick('/contact')}
                theme={theme}
            >
                Contact
            </StyledButton>
        </StyledNav>
    );
};

export default Nav;