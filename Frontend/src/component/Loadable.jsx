import { Suspense } from 'react';
import { Box, LinearProgress } from '@mui/material';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={
      <Box sx={{ position: 'fixed', top: 0, left: 0, zIndex: 2001, width: '100%' }}>
      <LinearProgress color="primary" />
    </Box>
    }>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
