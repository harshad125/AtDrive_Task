import { alpha } from '@mui/material/styles';

// ==============================|| CUSTOM SHADOWS ||============================== //

const CustomShadows = (theme) => ({
    button: `0 2px 0 rgba(0, 0, 0, 0.015)`,
    text: `0 -1px 0 rgba(0, 0, 0, 0.12)`,
    z1: `0px 1px 2px rgba(0, 0, 0, 0.05)`,
    primary: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
    secondary: `0 0 0 2px ${alpha(theme.palette.secondary.main, 0.2)}`,
    error: `0 0 0 2px ${alpha(theme.palette.error.main, 0.2)}`,
    warning: `0 0 0 2px ${alpha(theme.palette.warning.main, 0.2)}`,
    info: `0 0 0 2px ${alpha(theme.palette.info.main, 0.2)}`,
    success: `0 0 0 2px ${alpha(theme.palette.success.main, 0.2)}`,
    card: `0 10px 15px -3px ${alpha(theme.palette.common.black, 0.1)}, 0 4px 6px -2px ${alpha(theme.palette.common.black, 0.05)}`
});

export default CustomShadows;
