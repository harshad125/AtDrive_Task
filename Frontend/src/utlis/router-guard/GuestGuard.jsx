import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GuestGuard = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUri = searchParams.get('redirect');

  useEffect(() => {
    if (user !== null) {
      navigate('/product');
    }
  }, [user, navigate]);
  return children;
};

export default GuestGuard;
