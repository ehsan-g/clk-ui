import { createTheme } from '@mui/material/styles';

// Playful/cartoonish theme (deeper shadows on Paper/cards)
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FF5DA2',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#7AF7FF',
            contrastText: '#081826',
        },
        background: {
            default: '#0a0f1a',
            paper: '#0f1724',
        },
        text: {
            primary: '#F7F7FB',
            secondary: '#C6D6E0',
        },
    },
    typography: {
        fontFamily: '"Quicksand", "Fredoka One", Inter, Arial',
        h5: {
            fontFamily: '"Fredoka One", "Quicksand", sans-serif',
            fontWeight: 700,
            letterSpacing: '0.5px',
        },
        button: {
            textTransform: 'none',
            fontWeight: 700,
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    background:
                        'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '2px solid rgba(255,125,190,0.06)',
                    // *Extra deep* multi-layered shadow for dramatic depth
                    boxShadow:
                        // deep ambient volumetric shadow
                        '0 30px 120px rgba(2,6,23,0.85),' +
                        // colored halo
                        '0 22px 80px rgba(255,93,150,0.20),' +
                        // soft diffused color
                        '0 12px 48px rgba(122,247,255,0.10),' +
                        // subtle inner lift
                        '0 6px 18px rgba(0,0,0,0.65) inset',
                    backdropFilter: 'blur(10px)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    padding: '11px 20px',
                    boxShadow: '0 18px 50px rgba(2,6,23,0.7), 0 8px 30px rgba(255,93,150,0.14)',
                    transition: 'transform 180ms cubic-bezier(.2,.9,.2,1), box-shadow 180ms',
                },
                containedPrimary: {
                    background: 'linear-gradient(90deg,#FF5DA2,#FF9ACD)',
                    color: '#081826',
                    border: '2px solid rgba(255,255,255,0.06)',
                    transform: 'translateZ(0)',
                    '&:hover': { transform: 'translateY(-3px)' },
                },
                outlined: {
                    border: '2px solid rgba(255,255,255,0.06)',
                    padding: '8px 16px',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 14,
                        background:
                            'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.015))',
                        border: '1px solid rgba(255,255,255,0.05)',
                        boxShadow: '0 12px 30px rgba(1,6,20,0.68) inset, 0 12px 28px rgba(0,0,0,0.6)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'transparent',
                    boxShadow: 'none',
                    paddingTop: 12,
                    paddingBottom: 12,
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#081826',
                    color: '#fff',
                    border: '1px solid rgba(255,125,190,0.12)',
                    fontWeight: 600,
                },
            },
        },
    },
});

export default theme;
