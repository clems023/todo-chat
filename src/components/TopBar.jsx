import { Assignment, Menu, NotificationsOutlined, SettingsOutlined } from "@mui/icons-material"
import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from "@mui/material"

const TopBar = ({ handleDrawerToggle, selectedProject }) => {
    return (
        <Box>

            <AppBar position="static" sx={{ backgroundColor: '#171D1C' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Menu />
                    </IconButton>

                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Assignment />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Tasks
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="inherit" aria-label="show 4 new mails" >
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsOutlined />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit" onClick={() => { }}>
                        <SettingsOutlined />
                    </IconButton>
                </Toolbar>
            </AppBar >

        </Box>
    )
}

export default TopBar