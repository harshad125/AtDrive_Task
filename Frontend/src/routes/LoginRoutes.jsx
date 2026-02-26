import { lazy } from 'react';
import Loadable from '../component/Loadable.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import GuestGuard from '../utlis/router-guard/GuestGuard.jsx';
import CommonLayout from '../layout/commonLayout.jsx';
import { Outlet } from 'react-router-dom';

const Login = Loadable(lazy(() => import('../pages/auth/login.jsx')));

const Register = Loadable(lazy(() => import('../pages/auth/register.jsx')));

const LoginRoutes = {
  path: '/',
  ErrorBoundary: ErrorBoundary,
  children: [
    {
      path: '/',
      element: (
        <GuestGuard>
          <Outlet />
        </GuestGuard>
      ),
      children: [
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <Register />,
        },
      ],
    },
  ],
};

export default LoginRoutes;
