import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0ea5e9', // sky-500
    },
    secondary: {
      main: '#8b5cf6', // violet-500
    },
    background: {
      default: '#020617', // slate-950
      paper: '#0f172a', // slate-900
    },
    text: {
      primary: '#f1f5f9', // slate-100
      secondary: '#94a3b8', // slate-400
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", "-apple-system", "sans-serif"',
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(16px)',
          borderRight: '1px solid rgba(56, 189, 248, 0.2)',
        },
      },
    },
  },
});

export default theme;
