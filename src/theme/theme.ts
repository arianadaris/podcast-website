import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f50057',
      light: '#ff5983',
      dark: '#c51162',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.1,
      fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 600,
      lineHeight: 1.2,
      fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
      fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontSize: '1.875rem',
      fontWeight: 500,
      lineHeight: 1.3,
      fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
      fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
      fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.5,
      fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    button: {
      fontSize: '1.125rem',
      fontWeight: 600,
      textTransform: 'none',
      fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
      fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
      letterSpacing: '0.1em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '14px 28px',
          fontSize: '1.125rem',
          fontWeight: 600,
          fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: 12,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"C808s-Regular", "Roboto", "Helvetica", "Arial", sans-serif',
        },
      },
    },
  },
});
