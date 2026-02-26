import { useTheme, alpha } from '@mui/material/styles';
import { AppBar, Button, IconButton, Toolbar, Typography, Stack, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from '../store';
import { logout } from '../store/reducers/authReducer';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      zIndex: 1200,
      // boxShadow: theme.customShadows.z1
    },
  };

  const handleLogout = () => {
    // Implement logout functionality here
    dispatch(logout());
    navigate('/');
  };
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: alpha(theme.palette.background.paper, 0.7),
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          color: theme.palette.text.primary,
          zIndex: 1201,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, transparent)`,
            opacity: 0.5
          }
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h5'
              component='div'
              sx={{
                fontWeight: 800,
                letterSpacing: '-1px',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              AtDrive Store
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center'
            }}
          >
            {[
              { label: 'Products', path: '/product' },
              { label: 'Orders', path: '/order' },
              { label: 'Weather', path: '/weather' }
            ].map((item) => (
              <Button
                key={item.label}
                sx={{
                  color: alpha(theme.palette.text.primary, 0.7),
                  fontWeight: 600,
                  '&:hover': { color: theme.palette.primary.main, background: alpha(theme.palette.primary.main, 0.05) }
                }}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}

            <IconButton
              sx={{ color: theme.palette.text.primary, ml: 1, '&:hover': { color: theme.palette.primary.main } }}
              onClick={() => navigate('/cart')}
            >
              <Badge badgeContent={cartQuantity} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <Button
              variant='contained'
              color="primary"
              sx={{
                ml: 2,
                borderRadius: '12px',
                fontWeight: 700,
                px: 3
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>

          {/* Mobile Action (Simplified) */}
          <IconButton
            sx={{ display: { md: 'none' }, color: theme.palette.text.primary }}
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
