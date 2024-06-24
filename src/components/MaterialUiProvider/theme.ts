import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontSize: 22,  
        h1: {
            fontSize: '5.5rem',  
        },
        h2: {
            fontSize: '1.5rem',   
        },
        h3: {
            fontSize: '1.75rem', 
        },
        subtitle1: {
            fontSize: '1rem',   
        },
        body1: {
            fontSize: '0.875rem',  
        },
        
    },
});
