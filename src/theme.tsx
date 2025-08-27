import { createTheme } from '@mui/material/styles';


// Colors and styling chosen to match Uniswap's look (pink + dark background)
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FF007A', // Uniswap pink
            contrastText: '#fff',
        },
        background: {
            default: '#0b0b0d',
            paper: '#111214',
        },
        text: {
            primary: '#E6E6E6',
            secondary: '#AFAFB4',
        },
    },
    typography: {
        fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
        h4: {
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                },
            },
        },
    },
});


export default theme;