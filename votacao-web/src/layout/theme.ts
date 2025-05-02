import {createTheme} from '@mui/material/styles';
import {grey} from '@mui/material/colors';

export const Colors = {
    AZUL:     "#0A66C2",
    AMARELO:  "#FFC72C",
    VERMELHO: "#FF4C4C",
    VERDE:    "#00B37E",

    PALLET_ZERO: '#0c172e',
    PALLET_ONE: '#273e69',
    PALLET_THREE: '#0f1e32',
    PALLET_FOUR: '#93B7BE',
    PALLET_FIVE: '#808F85',

    TEXT_PRIMARY: "#FFFFFF",
    TEXT_SECONDARY: "#B0B0B0",
};

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: Colors.AZUL,
        },
        secondary: {
            main: Colors.VERDE,
        },
        error: {
            main: Colors.VERMELHO,
        },
        background: {
            default: Colors.PALLET_THREE,
            paper: Colors.PALLET_THREE,
        },
        text: {
            primary: Colors.TEXT_PRIMARY,
            secondary: Colors.TEXT_SECONDARY,
        },
    },
    typography: {
        fontFamily: [
                        "Montserrat",
                        "-apple-system",
                        "BlinkMacSystemFont",
                        '"Segoe UI"',
                        "Roboto",
                        '"Helvetica Neue"',
                        "Arial",
                        "sans-serif",
                    ].join(","),
        fontSize: 14,
        h4: {
            fontSize: "24px",
            lineHeight: "32px",
            fontWeight: 600,
        },
        h5: {
            fontSize: "20px",
            lineHeight: "28px",
            fontWeight: 500,
            textAlign: "center",
        },
        h6: {
            fontSize: "18px",
            lineHeight: "24px",
            fontWeight: 500,
        },
        subtitle1: {
            fontSize: "16px",
            lineHeight: "22px",
            fontWeight: 400,
            textAlign: "center",
            color: Colors.TEXT_SECONDARY,
        },
        body1: {
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: 400,
        },
        body2: {
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 400,
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                    backgroundColor: Colors.PALLET_THREE,
                    border: `1px solid ${grey[800]}`,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 500,
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    background: Colors.PALLET_THREE
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: Colors.PALLET_THREE
                }
            }
        }
    },
});
