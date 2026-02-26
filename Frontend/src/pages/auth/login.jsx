import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { useFormik } from 'formik';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AuthLayout from '../../layout/AuthLayout.jsx';
import ApiService from '../../service/ApiService.js';
import { dispatch } from '../../store/index.js';
import { login } from '../../store/reducers/authReducer.js';

// ------------------ FORM VALIDATION ------------------
const validationSchema = Yup.object({
  username: Yup.string()
    .min(6, 'Username must be at least 6 characters')
    .required('Username is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  // ------------------ FORMIK SETUP ----------------------
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      const { data, error } = await ApiService.authLoginAsync(values);
      if (data) {
        const token = {
          sessionToken: data.sessionToken,
          refreshToken: data.refreshToken,
        };
        const currentTokenUser = jwtDecode(token.sessionToken);
        dispatch(login({ user: currentTokenUser, token }));
      } else if (error) {
        setErrors(error);
      }
    },
  });

  return (
    <AuthLayout>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, sm: 6 },
          width: '100%',
          borderRadius: '24px',
          background: alpha(theme.palette.background.paper, 0.4),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.4)}`,
          animation: 'slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          '@keyframes slideUp': {
            from: { opacity: 0, transform: 'translateY(40px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h2"
            onClick={() => navigate('/')}
            sx={{
              fontWeight: 900,
              fontSize: '2.5rem',
              letterSpacing: '-2px',
              cursor: 'pointer',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            AtDrive Store
          </Typography>
          <Typography
            variant='h4'
            sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 1, letterSpacing: '-0.5px' }}
          >
            Welcome Back
          </Typography>
          <Typography variant='body1' sx={{ color: theme.palette.text.secondary, opacity: 0.8 }}>
            Sign in to your premium dashboard
          </Typography>
        </Box>

        <Box component='form' onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label='Username'
            name='username'
            placeholder='johndoe'
            variant='outlined'
            margin='normal'
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            className="neon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Email sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '14px',
              }
            }}
          />

          <TextField
            fullWidth
            label='Password'
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='••••••••'
            variant='outlined'
            margin='normal'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            className="neon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Lock sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end'
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                borderRadius: '14px',
              }
            }}
          />

          <Button
            fullWidth
            variant='contained'
            size='large'
            type="submit"
            disabled={formik.isSubmitting}
            sx={{
              py: 2,
              fontSize: '1rem',
              fontWeight: 700,
              borderRadius: '14px',
              textTransform: 'none',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {formik.isSubmitting ? 'Authenticating...' : 'Sign In Now'}
          </Button>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography
            variant='body2'
            sx={{ color: theme.palette.text.secondary, opacity: 0.7 }}
          >
            Don't have an account?{' '}
            <Button
              onClick={() => navigate('/signup')}
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                textTransform: 'none',
                '&:hover': { background: alpha(theme.palette.primary.main, 0.05) }
              }}
            >
              Create Account
            </Button>
          </Typography>
        </Box>
      </Paper>
    </AuthLayout>
  );
}

