import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiDrawer: {
            styleOverrides: {
                backgroundColor: '#171D1C'
            },
        },
    },
}
)

export default theme