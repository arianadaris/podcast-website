import Stack from '@mui/material/Stack';
import Logo from '@/components/Logo';
import styled from 'styled-components';
import Nav from '../Nav';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';

const StyledHeader = styled(Stack)`
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 100px;
    z-index: 1000;
`;

const MobileNav = styled(Stack)`
    background-color: rgba(10, 3, 30, 0.95);
    backdrop-filter: blur(10px);
    height: 100%;
    padding: 2rem;
    width: 100vw;
`;

const StyledButton = styled(Button)`
    color: white;
    text-transform: none;
    padding: 0.5rem;
    width: 100%;
    justify-content: center;
    font-family: inherit;
    font-size: inherit;

    &:hover {
        background-color: ${({ theme }) => theme.palette.primary.light};
    }
`;

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mediaOpen, setMediaOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMediaToggle = () => {
        setMediaOpen(!mediaOpen);
    };

    return (
        <>
            <StyledHeader 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center" 
                position="fixed" 
                width={isMobile ? "90%" : "85%"}
                top='1%'
                left='50%'
                sx={{ transform: 'translate(-50%, 0)' }}
                px={isMobile ? 2 : 4}
            >
                <Logo width={isMobile ? '5rem' : '7rem'} />
                {isMobile ? (
                    <IconButton
                        color="inherit"
                        aria-label={mobileOpen ? "close menu" : "open menu"}
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ color: 'white' }}
                    >
                        {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                ) : (
                    <>
                        <Nav />
                        <Box />
                    </>
                )}
            </StyledHeader>
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{
                    sx: {
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent'
                    }
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                    },
                }}
                transitionDuration={400}
                SlideProps={{
                    direction: "left"
                }}
            >
                <MobileNav spacing={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, px: 2 }}>
                        <Logo width="10rem" />
                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Stack spacing={4} alignItems="center">
                        <StyledButton
                            onClick={() => {
                                handleDrawerToggle();
                                window.location.href = '/about';
                            }}
                            theme={theme}
                        >
                            About
                        </StyledButton>
                        <StyledButton
                            onClick={() => {
                                handleDrawerToggle();
                                window.location.href = '/episodes';
                            }}
                            theme={theme}
                        >
                            Episodes
                        </StyledButton>
                        <Box sx={{ width: '100%' }}>
                            <StyledButton
                                onClick={handleMediaToggle}
                                endIcon={mediaOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                theme={theme}
                            >
                                Media
                            </StyledButton>
                            <Collapse in={mediaOpen}>
                                <Stack spacing={2} alignItems="center" sx={{ pt: 2 }}>
                                    <StyledButton
                                        onClick={() => {
                                            handleDrawerToggle();
                                            window.location.href = '/media/interviews';
                                        }}
                                        theme={theme}
                                    >
                                        Interviews
                                    </StyledButton>
                                    <StyledButton
                                        onClick={() => {
                                            handleDrawerToggle();
                                            window.location.href = '/media/events';
                                        }}
                                        theme={theme}
                                    >
                                        Events
                                    </StyledButton>
                                    {/* <StyledButton
                                        onClick={() => {
                                            handleDrawerToggle();
                                            window.location.href = '/media/projects';
                                        }}
                                        theme={theme}
                                    >
                                        Projects
                                    </StyledButton>
                                    <StyledButton
                                        onClick={() => {
                                            handleDrawerToggle();
                                            window.location.href = '/media/808s-on-cam';
                                        }}
                                        theme={theme}
                                    >
                                        808s on Cam
                                    </StyledButton> */}
                                </Stack>
                            </Collapse>
                        </Box>
                        <StyledButton
                            onClick={() => {
                                handleDrawerToggle();
                                window.location.href = '/contact';
                            }}
                            theme={theme}
                        >
                            Contact
                        </StyledButton>
                    </Stack>
                </MobileNav>
            </Drawer>
        </>
    );
};

export default Header;