// ==============================|| OVERRIDES - CARD ||============================== //

export default function Card(theme) {
    return {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.customShadows.card,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)`
                    }
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    padding: '24px'
                },
                title: {
                    fontSize: '1.125rem'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '24px',
                    '&:last-child': {
                        paddingBottom: '24px'
                    }
                }
            }
        }
    };
}
