
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { AccessAlarmOutlined, Add, ArrowDownward, ArrowUpward, CheckBoxOutlined, Inbox, Search, WbSunny } from '@mui/icons-material';
import { Avatar, Button, Collapse, Dialog, DialogTitle, FormControl, IconButton, InputLabel, ListItemButton, ListSubheader, MenuItem, Select, TextField, Typography } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const drawerWidth = 300;
function ProjectBar(props) {
    const { window } = props;

    const [selectedProjectIndex, setSelectedProjectIndex] = useState('');

    //Hover on ListItems
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleProjectHover = (index) => {
        setHoveredIndex(index);
    };


    const [openProjects, setOpenProjects] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    //Projects state
    const [projects, setProjects] = useState([])

    //On submit method
    const [openDialog, setOpenDialog] = useState(false);
    const { handleSubmit, control, reset } = useForm();

    const onSubmit = (data) => {
        //Create a new project
        const newProject = {
            id: projects.length + 1,
            title: data.title,
            description: data.description,
            tasks: [], // Ajoute une liste de tâches vide
        };

        //Add project into de the list of projects
        setProjects([...projects, newProject])

        //Set the project newly created
        props.setSelectedProject(newProject)

        // Réinitialise le formulaire après la soumission
        reset();
        handleCloseDialog()
    };

    const handleArrowClick = (projectIndex) => {
        const newOpenProjects = [...openProjects];
        newOpenProjects[projectIndex] = !newOpenProjects[projectIndex]
        setOpenProjects(newOpenProjects)
    };

    const handleProjectClick = (index) => {
        const clickedProject = projects[index]
        props.onProjectClick(clickedProject)
    }

    // Creation Dialog Form
    const handleOpenDialog = () => {
        setOpenDialog(true);
        reset();
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleProjectSelect = (event) => {

        const selectedIndex = event.target.value
        setSelectedProjectIndex(selectedIndex);

        if (selectedIndex === -1) {

            // Si l'élément "Add Project" est sélectionné, ouvre la boîte de dialogue pour créer un nouveau projet
            handleOpenDialog();
        } else {
            // Sinon, déclenche l'événement surProjectClick avec le projet correspondant
            const selectedProject = projects[selectedIndex];
            props.onProjectClick(selectedProject);
        }
    };



    const drawer = (
        <Box sx={{ color: 'white' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', pt: 2 }}>
                    <Avatar
                        alt='Michael Scott'
                        sx={{ width: 54, height: 54, mr: 2 }}
                        src='https://pilbox.themuse.com/image.jpg?filter=antialias&h=700&opt=1&pos=top-left&prog=1&q=keep&url=https%3A%2F%2Fcms-assets.themuse.com%2Fmedia%2Flead%2F6637.jpg&w=700'
                    />
                </Box>
                <Box pt={2}>
                    <Typography variant="h6" >
                        Michael Scott
                    </Typography>
                    <Typography sx={{ fontSize: 'small', color: 'whitesmoke' }}>michaelboss@office.com</Typography>
                </Box>
            </Toolbar>
            <Divider />

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
                    <InputLabel id="projet-label" sx={{ color: "white" }}>Project</InputLabel>

                    <Select
                        value={selectedProjectIndex}
                        onChange={handleProjectSelect}
                        labelId='projet-label'
                        displayEmpty
                        autoWidth
                        label="Project"
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{ width: 263, backgroundColor: '#171D1C', color: 'white', "& fieldset": { borderColor: "white" }, "& svg": { color: "white" } }}
                        MenuProps={{
                            sx: {
                                "& .MuiPaper-root": {
                                    backgroundColor: "#171D1C",
                                    width: 263
                                }
                            }
                        }}
                    >
                        <MenuItem value={-1} sx={{ backgroundColor: '#171D1C', color: 'white' }}>
                            Add Project
                        </MenuItem>
                        {projects.map((project, index) => (
                            <MenuItem key={index} value={index} sx={{ backgroundColor: '#171D1C', color: 'white' }}>
                                {project.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </Box>

            <List component="div" disablePadding sx={{ mt: 2 }}>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleNestedItemClick(project)}>
                    <ListItemIcon>
                        <WbSunny fontSize='small' sx={{ color: "white" }} />
                    </ListItemIcon>
                    <Typography fontSize="small">Today</Typography>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleNestedItemClick(project)}>
                    <ListItemIcon>
                        <StarBorderOutlinedIcon fontSize='small' sx={{ color: "white" }} />
                    </ListItemIcon>
                    <Typography fontSize="small">Important</Typography>
                </ListItemButton>
                <ListItem button sx={{ pl: 4 }}>
                    <ListItemIcon>
                        <AccessAlarmOutlined fontSize='small' sx={{ color: "white" }} />
                    </ListItemIcon>
                    <Typography fontSize="small">Planned</Typography>
                </ListItem>

                <ListItem button sx={{ pl: 4 }}>
                    <ListItemIcon>
                        <CheckBoxOutlined fontSize='small' sx={{ color: "white" }} />
                    </ListItemIcon>
                    <Typography fontSize="small">Done</Typography>
                </ListItem>
            </List>

            {/* <List
                sx={{ width: '100%', maxWidth: 360 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader sx={{ bgcolor: "#171D1C" }} component="div" id="nested-list-subheader">
                        <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', pt: 2 }}>
                            <Typography fontWeight="bold" sx={{ flex: 1, color: "white" }}>My projects</Typography>
                            <IconButton onClick={handleOpenDialog} sx={{ ml: 1 }}>
                                <Add sx={{ color: "white" }} />
                            </IconButton>

                        </Box>
                    </ListSubheader>
                }
            >
               

                {/* {projects.map((project, index) => (
                    <React.Fragment key={index}>
                        <ListItemButton
                            onMouseEnter={() => handleProjectHover(index)}
                            onMouseLeave={() => handleProjectHover(null)}
                            onClick={() => handleProjectClick(index)}
                        >
                            <ListItemIcon>
                                <Inbox fontSize="small" sx={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText primary={project.title} />
                            {hoveredIndex === index && (
                                <IconButton onClick={() => handleArrowClick(index)}>
                                    {openProjects[index] ? <ArrowUpward sx={{ color: "white", fontSize: "small" }} /> : <ArrowDownward sx={{ color: "white", fontSize: "small" }} />}
                                </IconButton>
                            )}
                        </ListItemButton>
                        <Collapse in={openProjects[index]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }} onClick={() => handleNestedItemClick(project)}>
                                    <ListItemIcon>
                                        <WbSunny fontSize='small' sx={{ color: "white" }} />
                                    </ListItemIcon>
                                    <Typography fontSize="small">Today</Typography>
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }} onClick={() => handleNestedItemClick(project)}>
                                    <ListItemIcon>
                                        <StarBorderOutlinedIcon fontSize='small' sx={{ color: "white" }} />
                                    </ListItemIcon>
                                    <Typography fontSize="small">Important</Typography>
                                </ListItemButton>
                                <ListItem button sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <AccessAlarmOutlined fontSize='small' sx={{ color: "white" }} />
                                    </ListItemIcon>
                                    <Typography fontSize="small">Planned</Typography>
                                </ListItem>

                                <ListItem button sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <CheckBoxOutlined fontSize='small' sx={{ color: "white" }} />
                                    </ListItemIcon>
                                    <Typography fontSize="small">Done</Typography>
                                </ListItem>
                            </List>
                        </Collapse>
                    </React.Fragment>
                ))} 
            </List> */}

            <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                InputProps={{
                    endAdornment: (
                        <IconButton
                            type="submit"
                            aria-label="Search"
                            color="primary"
                        >
                            <Search />
                        </IconButton>
                    ),
                    style: { color: 'white' }
                }}
                InputLabelProps={{ style: { color: 'white' } }}
                sx={{
                    m: 2, backgroundColor: '#2D3937', borderRadius: 5, '& fieldset': {
                        borderRadius: 5,
                    },
                }}
            />
            <Divider />


            <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{
                style: {
                    backgroundColor: '#171D1C',
                    color: 'white'
                },
            }}>
                <DialogTitle>Create a New Project</DialogTitle>
                <Box sx={{ p: 2 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        style: {
                                            color: 'white',
                                        },
                                    }}
                                    InputProps={{
                                        style: {
                                            color: 'white',
                                        },
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    InputLabelProps={{
                                        style: {
                                            color: 'white',
                                        },
                                    }}
                                    InputProps={{
                                        style: {
                                            color: 'white',
                                        },
                                    }}
                                />
                            )}
                        />
                        <Box sx={{ mt: 2, textAlign: 'right' }}>
                            <Button onClick={handleCloseDialog} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" variant="contained" sx={{ ml: 1 }}>
                                Save
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Dialog>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, backgroundColor: 'black' }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#171D1C', },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{

                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', width: drawerWidth,
                            backgroundColor: '#171D1C',
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
}

ProjectBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,

};

export default ProjectBar;
