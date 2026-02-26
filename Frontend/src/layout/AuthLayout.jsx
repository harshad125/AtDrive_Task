import { Box, useTheme, alpha } from '@mui/material';

export default function AuthLayout({ children }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: theme.palette.background.default,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'var(--mesh-gradient)',
          opacity: 0.6,
          zIndex: 1
        }
      }}
    >
      {/* Ambient Background Glows */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: alpha(theme.palette.primary.main, 0.15),
          filter: 'blur(100px)',
          borderRadius: '50%',
          zIndex: 2
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: alpha(theme.palette.secondary.main, 0.15),
          filter: 'blur(120px)',
          borderRadius: '50%',
          zIndex: 2
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: 480,
          px: 3
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

