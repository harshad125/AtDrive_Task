import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import Header from './Header';
import { Box } from '@mui/material';

// ==============================|| Loader ||============================== //

const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
}));

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color='primary' />
  </LoaderWrapper>
);

// ==============================|| MINIMAL LAYOUT ||============================== //

const CommonLayout = ({ layout = 'blank' }) => {
  return (
    <>
      {layout === 'blank' && (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#0f172a', // Dark base to match the mesh gradient
          }}
        >
          <Header />
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              pt: { xs: '64px', sm: '70px' }, // Offset for the fixed Header
            }}
          >
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      )}
    </>
  );
};

CommonLayout.propTypes = {
  layout: PropTypes.string,
};

export default CommonLayout;
