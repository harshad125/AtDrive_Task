import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project import
import { useSelector } from 'react-redux';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }) => {
  const { user, isUserLogout } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname, search, hash } = location;
  const encodedRedirectUrl = encodeURIComponent(`${pathname}${search}${hash}`);

  const loginRedirectUri = isUserLogout
    ? 'login'
    : `login?redirect=${encodedRedirectUrl}`;

  useEffect(() => {
    if (!user) {
      navigate(loginRedirectUri, { replace: true });
    }
  }, [user, location.pathname]);

  if (!user) return <></>;

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
