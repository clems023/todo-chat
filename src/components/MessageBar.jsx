import { Send } from "@mui/icons-material"
import { AppBar, Box, IconButton, InputBase, Paper, Toolbar } from "@mui/material"


const MessageBar = () => {
    return (

        <Paper elevation={4} sx={{ bottom: '0', width: '100%' }}>
            <AppBar position="static" sx={{ backgroundColor: '#171D1C' }}>
                <Toolbar>
                    <Box display="flex" borderRadius="3px" width="100%" sx={{ background: '#242C2B' }} color="white">
                        <InputBase fullWidth sx={{ ml: 2, flex: 4 }} color="action" placeholder="Type your message" />
                        <IconButton type="button" sx={{ p: 1 }}>
                            <Send />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Paper>
    )
}

export default MessageBar