import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
    const disabledStyle = {
        '&.Mui-disabled': {
            backgroundColor: theme.palette.grey[200]
        }
    };

    return {
        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: 12,
                    textTransform: 'none',
                    padding: '8px 20px'
                },
                containedPrimary: {
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                        boxShadow: `0 8px 16px -4px ${alpha(theme.palette.primary.main, 0.5)}`
                    }
                },
                contained: {
                    ...disabledStyle,
                    boxShadow: 'none'
                },
                outlined: {
                    ...disabledStyle,
                    borderRadius: 12
                }
            }
        }
    };
}
