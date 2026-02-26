import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

// project import
import router from './routes';
import './service/AxiosService';
import ThemeCustomization from './themes';
import util from './utlis/util';
import Loader from './component/Loader';
import { jwtDecode } from 'jwt-decode';
import { login, logout } from './store/reducers/authReducer';
import { Toaster } from 'sonner';

// ==============================|| APP ||============================== //

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bindToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bindToken = async () => {
    try {
      const token = util.getTokensFromStorage();
      if (token && token.sessionToken) {
        const currentTokenUser = jwtDecode(token.sessionToken);
        dispatch(login({ user: currentTokenUser, token }));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      dispatch(logout());
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeCustomization>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" richColors />
    </ThemeCustomization>
  );
}

export default App;