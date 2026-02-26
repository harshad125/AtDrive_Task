import { alpha } from '@mui/material/styles';

// ==============================|| PALETTE - COLORS ||============================== //

const palette = (mode) => {
  const grey = {
    0: '#ffffff',
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    A100: '#f8fafc',
    A200: '#f1f5f9',
    A400: '#e2e8f0',
    A700: '#cbd5e1'
  };

  const primary = {
    lighter: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    main: '#7c3aed', // Xtract Purple
    600: '#6d28d9',
    700: '#5b21b6',
    dark: '#4c1d95',
    900: '#2e1065',
    contrastText: '#fff'
  };

  const secondary = {
    lighter: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    main: '#0ea5e9', // Xtract Sky Blue
    600: '#0284c7',
    700: '#0369a1',
    dark: '#075985',
    900: '#0c4a6e',
    contrastText: '#fff'
  };

  const error = {
    lighter: '#fff1f0',
    main: '#ff4d4f',
    dark: '#cf1322',
    contrastText: '#fff'
  };

  const warning = {
    lighter: '#fffbe6',
    main: '#faad14',
    dark: '#d48806',
    contrastText: grey[800]
  };

  const info = {
    lighter: '#e0f2fe',
    main: '#0ea5e9',
    dark: '#0369a1',
    contrastText: '#fff'
  };

  const success = {
    lighter: '#f0fdf4',
    main: '#22c55e',
    dark: '#15803d',
    contrastText: '#fff'
  };

  return {
    mode,
    common: {
      black: '#000',
      white: '#fff'
    },
    primary,
    secondary,
    error,
    warning,
    info,
    success,
    grey,
    divider: mode === 'dark' ? alpha(grey[200], 0.05) : grey[200],
    background: {
      paper: mode === 'dark' ? '#0f172a' : grey[0],
      default: mode === 'dark' ? '#020617' : grey[50]
    },
    action: {
      disabled: grey[400]
    },
    text: {
      primary: mode === 'dark' ? grey[100] : grey[800],
      secondary: mode === 'dark' ? grey[400] : grey[500],
      disabled: grey[400]
    }
  };
};

export default palette;
