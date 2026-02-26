// ==============================|| TYPOGRAPHY ||============================== //

const typography = (fontFamily) => ({
    htmlFontSize: 16,
    fontFamily,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
        fontWeight: 700,
        fontSize: '3rem',
        lineHeight: 1.1,
        letterSpacing: '-0.02em'
    },
    h2: {
        fontWeight: 700,
        fontSize: '2.25rem',
        lineHeight: 1.2,
        letterSpacing: '-0.01em'
    },
    h3: {
        fontWeight: 700,
        fontSize: '1.75rem',
        lineHeight: 1.3
    },
    h4: {
        fontWeight: 700,
        fontSize: '1.5rem',
        lineHeight: 1.4
    },
    h5: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.5
    },
    h6: {
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.57
    },
    caption: {
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.66
    },
    body1: {
        fontSize: '1rem',
        lineHeight: 1.6
    },
    body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6
    },
    subtitle1: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.57
    },
    subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.66
    },
    overline: {
        lineHeight: 1.66,
        textTransform: 'uppercase',
        fontWeight: 700,
        letterSpacing: '0.1em'
    },
    button: {
        textTransform: 'none',
        fontWeight: 600
    }
});

export default typography;
