import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loadable from '../component/Loadable.jsx';
import AuthGuard from '../utlis/router-guard/AuthGuard.jsx';
import CommonLayout from '../layout/commonLayout.jsx';

// render main pages
const ProductList = Loadable(lazy(() => import('../pages/product/productList.jsx')));
const CartList = Loadable(lazy(() => import('../pages/product/CartList.jsx')));
const OrderList = Loadable(lazy(() => import('../pages/order/OrderList.jsx')));
const WeatherDashboard = Loadable(lazy(() => import('../pages/weather/WeatherDashboard.jsx')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <CommonLayout />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/product" replace />
        },
        {
          path: 'product',
          element: <ProductList />,
        },
        {
          path: 'cart',
          element: <CartList />,
        },
        {
          path: 'order',
          element: <OrderList />,
        },
        {
          path: 'weather',
          element: <WeatherDashboard />,
        },
      ],
    },
  ],
};

export default MainRoutes;
