import { createBrowserRouter } from 'react-router-dom';
import LoginRoutes from './LoginRoutes.jsx';
import MainRoutes from './MainRoutes.jsx';

// ==============================|| ROUTING RENDER ||============================== //

const configRouter = () => {
  // default routes
  const routes = [LoginRoutes, MainRoutes];

  return createBrowserRouter(
    routes
    // { basename: import.meta.env.VITE_APP_BASE_NAME }
  );
};

export default configRouter();
