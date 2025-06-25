"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theme = void 0;
var styles_1 = require("@mui/material/styles");
var breakpoints = {
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
    },
};
exports.theme = (0, styles_1.createTheme)({
    breakpoints: breakpoints,
    palette: {
        primary: {
            main: '#1976d2',
            light: '#01A5FC',
        },
        secondary: {
            main: (0, styles_1.darken)('#FFFFFF', 0.5),
        },
        text: {
            primary: '#FFFFFF',
            secondary: (0, styles_1.darken)('#FFFFFF', 0.5),
        },
        background: {
            default: '#141414',
        },
    },
    typography: {
        fontSize: 18,
        fontFamily: ['Gotham', 'sans-serif'].join(','),
        h1: {
            fontFamily: ['C808s', 'sans-serif'].join(','),
            textTransform: 'uppercase',
            lineHeight: 0.8,
            fontSize: '4rem',
            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h2: {
            fontFamily: ['C808s', 'sans-serif'].join(','),
            textTransform: 'uppercase',
            '@media (max-width:600px)': {
                fontSize: '1.8rem',
            },
        },
        h5: {
            fontFamily: ['C808s', 'sans-serif'].join(','),
            fontSize: 32,
            '@media (max-width:600px)': {
                fontSize: '1.5rem',
            },
        },
        h6: {
            textTransform: 'uppercase',
            '@media (max-width:600px)': {
                fontSize: '1rem',
            },
        },
        body1: {
            fontSize: 18,
            '@media (max-width:600px)': {
                fontSize: '1rem',
            },
        },
        body2: {
            fontFamily: ['C808s', 'sans-serif'].join(','),
            fontSize: 26,
            '@media (max-width:600px)': {
                fontSize: '1.2rem',
            },
        }
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50px',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            transition: '0.15s ease all',
                        },
                        '&:hover fieldset': {
                            borderColor: '#01A5FC',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#01A5FC',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white',
                        paddingLeft: '1rem',
                        '&.Mui-focused': {
                            color: '#01A5FC',
                        },
                    },
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: 'radial-gradient(71.39% 125.75% at 79.69% 100%, rgba(231, 8, 142, 0.05) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(46.03% 106.57% at 1.96% 0%, rgba(8, 134, 231, 0.15) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(59.56% 243.51% at 97.02% 72.79%, rgba(8, 134, 231, 0.075) 0%, rgba(0, 0, 0, 0) 100%), #1F1F1F',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: '0.15s ease all',
                    '&:hover': {
                        backgroundColor: '#232323',
                    }
                }
            }
        },
    },
});
