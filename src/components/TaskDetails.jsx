/* eslint-disable react/prop-types */
import { Add, AlarmAddOutlined, CalendarToday, Close, EmojiFlagsOutlined, MoreVert } from "@mui/icons-material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Avatar, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Toolbar, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const TaskDetails = ({ task, open, onClose, toggleTaskCompleted, handleClickOpenDialog, updateTask, tasks }) => {


    const initialUsers = [
        { id: 1, username: 'Gustavo Perez', email: 'user1@example.com', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 2, username: 'Lana Pervanche', email: 'user2@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 3, username: 'Koffi Gombo', email: 'user3@example.com', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 4, username: 'Penny Thompson', email: 'user4@example.com', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 5, username: 'Oswald Cavendish', email: 'user5@example.com', avatar: 'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ];

    const taskDetail = tasks.find((tas) => tas.id === task.id);


    const [priority, setPriority] = useState(taskDetail ? taskDetail.priority : "Normal")

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);

        // Vous pouvez également mettre à jour la priorité dans l'objet de tâche si nécessaire
        const updatedTask = {
            ...taskDetail,
            priority: event.target.value,
        };

        updateTask(updatedTask);
    };


    // More vert dots for Assigned Users
    const [moreVertUserIndex, setMoreVertUserIndex] = useState(null)

    const handleOpenMoreVertUser = (event, index) => {
        setMoreVertUserIndex(index)
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMoreVertUser = () => {
        setMoreVertUserIndex(null)
        setAnchorEl(null)
    }

    //More vert dots for Substasks
    const [moreVertIndex, setMoreVertIndex] = useState(null)

    const handleOpenMoreVertSubtask = (event, index) => {
        setMoreVertIndex(index)
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMoreVertSubtask = () => {
        setMoreVertIndex(null)
        setAnchorEl(null)
    }

    // More vert dots for Task details
    const [anchorEl, setAnchorEl] = useState(null);
    const openMore = Boolean(anchorEl);
    const handleClickMoreVert = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleCloseMoreVert = () => {
        setAnchorEl(null);
    }

    //Users dialog
    const [openUserDialog, setOpenUserDialog] = useState(false)
    const handleOpenUserDialog = () => {
        setOpenUserDialog(true);
    }

    //Users management
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [availableUsers, setAvailableUsers] = useState(initialUsers);

    const handleAddUser = (user) => {
        // Ajoute l'utilisateur à la liste des assignés et le retire de la liste des disponibles
        setAssignedUsers([...assignedUsers, user]);

        const updatedTask = {
            ...taskDetail,
            assignedUsers: [...taskDetail.assignedUsers, user],
        };

        updateTask(updatedTask)

        setAvailableUsers(availableUsers.filter((u) => u.id !== user.id));
    };

    const handleRemoveUser = (user) => {
        // Retire l'utilisateur de la liste des assignés et le remet dans la liste des disponibles
        const updatedTask = {
            ...taskDetail,
            assignedUsers: taskDetail.assignedUsers.filter((u) => u.id !== user.id),
        };

        updateTask(updatedTask);
        setAvailableUsers([...availableUsers, user]);
        handleCloseMoreVertUser()
    };

    //Substasks management
    const { handleSubmit, control, reset } = useForm();

    const onSubmit = (data) => {
        // Logique de traitement des données ici
        const newSubtask = {
            id: new Date().getTime(),
            text: data.subtask,
            completed: false,
        };

        const updatedSubtasks = [...taskDetail.subtasks, newSubtask];

        // Créez une nouvelle tâche avec la liste de sous-tâches mise à jour
        const updatedTask = {
            ...task,
            subtasks: updatedSubtasks,
        };
        updateTask(updatedTask);

        // Réinitialise le formulaire après la soumission
        reset();
        handleClose();
    };

    // State pour gérer l'ouverture/fermeture du dialog
    const [openSubtaskDialog, setOpenSubstackDialog] = useState(false);

    // Fonction pour ouvrir le dialog de sous-tâche
    const handleOpen = () => {
        setOpenSubstackDialog(true);
    };

    // Fonction pour fermer le dialog de sous-tâche
    const handleClose = () => {
        setOpenSubstackDialog(false);
    };

    //Check the subtasks
    const handleToggleSubtask = (index) => {
        const updatedSubtasks = [...taskDetail.subtasks];
        updatedSubtasks[index].completed = !updatedSubtasks[index].completed;

        // Met à jour la tâche avec la liste de sous-tâches mise à jour
        const updatedTask = {
            ...taskDetail,
            subtasks: updatedSubtasks,
        };

        // Met à jour l'état global des tâches
        updateTask(updatedTask);

        // Vérifie si toutes les sous-tâches sont complétées
        const allSubtasksCompleted = updatedSubtasks.every(subtask => subtask.completed);

        // Si toutes les sous-tâches sont complétées, marquer la tâche principale comme complétée
        if (allSubtasksCompleted) {
            toggleTaskCompleted(task.id);
        }
    }

    //Delete the subtasks
    const handleDeleteSubtask = (index) => {
        const updatedSubtasks = [...taskDetail.subtasks];
        const deletedSubtask = updatedSubtasks.splice(index, 1)[0];

        // Met à jour la tâche avec la liste de sous-tâches mise à jour
        const updatedTask = {
            ...taskDetail,
            subtasks: updatedSubtasks,
        };

        // Met à jour l'état global des tâches
        updateTask(updatedTask);

        // Vérifie si la sous-tâche supprimée était complétée, et si oui, vérifie si toutes les autres sous-tâches sont complétées
        if (deletedSubtask.completed) {
            const allSubtasksCompleted = updatedSubtasks.every(subtask => subtask.completed);

            // Si toutes les sous-tâches sont complétées, marquer la tâche principale comme complétée
            if (allSubtasksCompleted) {
                toggleTaskCompleted(task.id);
            }
        }
    };

    //Substask confimation dialog
    const [deleteSubtaskIndex, setDeleteSubtaskIndex] = useState(null);
    const [openDeleteSubtaskDialog, setOpenDeleteSubtaskDialog] = useState(false)

    // Fonction pour ouvrir la boîte de dialogue de confirmation de la suppression d'une sous-tâche
    const handleOpenDeleteSubtaskDialog = (index) => {
        setDeleteSubtaskIndex(index);
        // Ouvre la boîte de dialogue de confirmation
        setOpenDeleteSubtaskDialog(true);
    };

    // Fonction pour fermer la boîte de dialogue de confirmation de la suppression d'une sous-tâche
    const handleCloseDeleteSubtaskDialog = () => {
        setDeleteSubtaskIndex(null);
        // Ferme la boîte de dialogue de confirmation
        setOpenDeleteSubtaskDialog(false);
    };

    // Fonction pour confirmer la suppression d'une sous-tâche
    const handleConfirmDeleteSubtask = () => {
        // Exécute la suppression uniquement si l'index de la sous-tâche à supprimer est défini
        if (deleteSubtaskIndex !== null) {
            handleDeleteSubtask(deleteSubtaskIndex);
        }
        // Ferme la boîte de dialogue de confirmation
        handleCloseDeleteSubtaskDialog();
        handleCloseMoreVertSubtask()
    };


    const [deleteUserId, setDeleteUserId] = useState(null);
    const [openDeleteUserDialog, setOpenDeleteUserDialog] = useState(false)

    // Fonction pour ouvrir la boîte de dialogue de confirmation de la suppression d'un utilisateur
    const handleOpenDeleteUserDialog = (user) => {
        setDeleteUserId(user);
        // Ouvre la boîte de dialogue de confirmation
        setOpenDeleteUserDialog(true);
    };

    // Fonction pour fermer la boîte de dialogue de confirmation de la suppression d'un utilisateur
    const handleCloseDeleteUserDialog = () => {
        setDeleteUserId(null);
        // Ferme la boîte de dialogue de confirmation
        setOpenDeleteUserDialog(false);
    };

    // Fonction pour confirmer la suppression d'un utilisateur
    const handleConfirmDeleteUser = () => {
        // Exécute la suppression uniquement si l'ID de l'utilisateur à supprimer est défini
        if (deleteUserId !== null) {
            handleRemoveUser(deleteUserId);
        }
        // Ferme la boîte de dialogue de confirmation
        handleCloseDeleteUserDialog();
    };

    const [editedText, setEditedText] = useState(task.text)
    const [openEditDialog, setOpenEditDialog] = useState(false)

    const handleEditClick = () => {
        setEditedText(task.text)
        setOpenEditDialog(true)
    }

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false)
    }

    const handleUpdateText = () => {

        const updatedTask = {
            ...taskDetail,
            text: editedText,
        };

        updateTask(updatedTask);

        handleCloseEditDialog();
    }



    return (
        <Drawer anchor="right" open={open} variant="persistent" onClose={onClose} sx={{ '& .MuiDrawer-paper': { backgroundColor: "#171D1C" } }} >
            <Toolbar>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', width: "100%" }}>
                    <Typography variant="h5">Task Details</Typography>
                    <IconButton sx={{ ml: 4, color: "white" }} onClick={handleClickMoreVert}><MoreVert sx={{ color: 'white' }} /></IconButton>
                    <Menu
                        id="action-menu"
                        anchorEl={anchorEl}
                        open={openMore}
                        onClose={handleCloseMoreVert}
                        MenuListProps={{
                            'aria-labelledby': 'more-button',
                        }}
                        sx={{
                            "& .MuiPaper-root": {
                                backgroundColor: "#171D1C"
                            }
                        }}
                    >
                        <MenuItem sx={{ color: "white" }} onClick={() => handleEditClick()}>Edit</MenuItem>
                        <MenuItem sx={{ color: "white" }} onClick={() => handleClickOpenDialog()}>Delete</MenuItem>
                    </Menu>

                    <Dialog
                        open={openEditDialog}
                        onClose={handleCloseEditDialog}
                        aria-labelledby="edit-dialog-title"
                        aria-describedby="edit-dialog-description"
                        PaperProps={{
                            style: {
                                backgroundColor: '#171D1C',
                                color: 'white'
                            },
                        }}
                    >
                        <DialogTitle id="edit-dialog-title">{"Edit Task"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="edit-dialog-description">
                                <TextField
                                    type="text"
                                    value={editedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                    InputProps={{
                                        style: {
                                            color: 'white',
                                        },
                                    }}
                                />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseEditDialog}>Cancel</Button>
                            <Button onClick={handleUpdateText} autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <IconButton onClick={onClose}><Close sx={{ color: 'gray' }} /></IconButton>
                </Box>
            </Toolbar>
            <Box sx={{ width: 300, padding: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#364542',
                        padding: 2,
                        borderRadius: 1,
                        border: '1px solid #364542',
                        marginBottom: 2,
                        textDecoration: task.completed ? "line-through" : "none",
                    }}
                >
                    <Checkbox
                        checked={taskDetail && taskDetail.completed}
                        onClick={() => toggleTaskCompleted(task.id)}
                        sx={{
                            color: 'white',
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            color: taskDetail && taskDetail.completed ? "gray" : "white",
                            textDecoration: taskDetail && taskDetail.completed ? "line-through" : "none",
                            flex: 1
                        }}
                    >
                        {taskDetail && taskDetail.text}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#364542',
                    borderRadius: 2,
                    border: '1px solid #364542',
                    color: 'white',
                    marginBottom: 4
                }}>
                    <List sx={{ width: '100%' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <EmojiFlagsOutlined sx={{ color: "white" }} />
                                </ListItemIcon>
                                <ListItemText primary="Priority" />
                                <Box sx={{ ml: 'auto' }}>
                                    <TextField
                                        select
                                        value={taskDetail && taskDetail.priority}
                                        onChange={handlePriorityChange}
                                        InputProps={{
                                            style: {
                                                color: 'white',
                                            },
                                        }}
                                        SelectProps={{
                                            native: true,
                                        }}
                                    >
                                        {["Low", "Normal", "High"].map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </TextField>
                                </Box>
                            </ListItemButton>
                        </ListItem>
                        <Divider component="li" />
                        <ListItem disablePadding>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker defaultValue={dayjs('2022-04-17')} />
                            </LocalizationProvider>
                        </ListItem>
                        <Divider component="li" />

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AlarmAddOutlined sx={{ color: "white" }} />
                                </ListItemIcon>
                                <ListItemText primary="Reminder" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>


                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', width: "100%" }}>
                    <Typography variant="h5">Assigned to</Typography>
                    <IconButton onClick={handleOpenUserDialog}><Add sx={{ color: 'white' }} /></IconButton>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#364542',
                    borderRadius: 2,
                    border: '1px solid #364542',
                    color: 'white',
                    marginBottom: 4
                }}>
                    {(!taskDetail || !taskDetail.assignedUsers || taskDetail.assignedUsers.length === 0) ? (
                        <Box sx={{ flexGrow: 1, p: 2 }}>
                            <Typography variant="p" sx={{ color: "#BDBAB3" }} fontStyle="italic" >No users</Typography>
                        </Box>
                    ) : (
                        <List sx={{ width: '100%' }}>
                            {taskDetail.assignedUsers.map((user, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={user.avatar} />
                                        </ListItemAvatar>
                                        <ListItemText primary={user.username} sx={{ color: 'white' }} />
                                        <IconButton onClick={(event) => handleOpenMoreVertUser(event, index)} sx={{ color: 'white' }}>
                                            <MoreVert />
                                        </IconButton>
                                    </ListItemButton>
                                    <Menu
                                        id={`user-menu-${index}`}
                                        anchorEl={anchorEl}
                                        open={openMore && moreVertUserIndex === index}
                                        onClose={handleCloseMoreVertUser}
                                        MenuListProps={{
                                            'aria-labelledby': `user-more-button-${index}`,
                                        }}
                                        sx={{
                                            "& .MuiPaper-root": {
                                                backgroundColor: "#171D1C"
                                            }
                                        }}
                                    >
                                        <MenuItem sx={{ color: 'white' }} onClick={() => handleCloseMoreVertUser()}>Edit</MenuItem>
                                        <MenuItem sx={{ color: 'white' }} onClick={() => handleOpenDeleteUserDialog(user)}>Delete</MenuItem>
                                    </Menu>
                                    <Dialog
                                        open={openDeleteUserDialog}
                                        onClose={handleCloseDeleteUserDialog}
                                        PaperProps={{
                                            style: {
                                                backgroundColor: '#171D1C',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        <DialogTitle>Confirm Deletion</DialogTitle>
                                        <DialogContent>
                                            <Typography>Are you sure you want to delete this user?</Typography>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleCloseDeleteUserDialog}>Cancel</Button>
                                            <Button onClick={handleConfirmDeleteUser} autoFocus>
                                                Confirm
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </ListItem>
                            ))}
                        </List>
                    )}

                </Box>
                <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)} PaperProps={{
                    style: {
                        backgroundColor: '#171D1C',
                        color: 'white',
                    },
                }}>
                    <DialogTitle>Select User</DialogTitle>
                    <List>
                        {availableUsers.map((user, index) => (
                            <ListItem key={index} button onClick={() => handleAddUser(user)}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={user.avatar} />
                                </ListItemAvatar>
                                <ListItemText primary={user.username} sx={{ color: 'white' }} />
                            </ListItem>
                        ))}
                    </List>
                </Dialog>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', width: "100%" }}>
                    <Typography variant="h5">Subtasks</Typography>
                    <IconButton onClick={handleOpen}><Add sx={{ color: 'white' }} /></IconButton>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#364542',
                    borderRadius: 2,
                    border: '1px solid #364542',
                    color: 'white',
                    marginBottom: 4
                }}>
                    {(!taskDetail || !taskDetail.subtasks || taskDetail.subtasks.length === 0) ? (
                        <Box sx={{ flexGrow: 1, p: 2 }}>
                            <Typography variant="p" sx={{ color: "#BDBAB3" }} fontStyle="italic">
                                No subtasks
                            </Typography>
                        </Box>
                    ) : (
                        <List sx={{ width: '100%' }}>
                            {taskDetail.subtasks.map((subtask, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Checkbox
                                                checked={subtask.completed}
                                                onClick={() => handleToggleSubtask(index)}
                                                sx={{
                                                    color: 'white',
                                                }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={subtask.text} sx={{ textDecoration: subtask.completed ? 'line-through' : 'none', color: subtask.completed ? 'gray' : 'white' }} />
                                        <IconButton onClick={(event) => handleOpenMoreVertSubtask(event, index)} sx={{ color: 'white' }}>
                                            <MoreVert />
                                        </IconButton>
                                    </ListItemButton>
                                    <Menu
                                        id={`subtask-menu-${index}`}
                                        anchorEl={anchorEl}
                                        open={openMore && moreVertIndex === index}
                                        onClose={handleCloseMoreVertSubtask}
                                        MenuListProps={{
                                            'aria-labelledby': `subtask-more-button-${index}`,
                                        }}
                                        sx={{
                                            "& .MuiPaper-root": {
                                                backgroundColor: "#171D1C"
                                            }
                                        }}
                                    >
                                        <MenuItem sx={{ color: 'white' }} onClick={() => handleCloseMoreVert()}>Edit</MenuItem>
                                        <MenuItem sx={{ color: 'white' }} onClick={() => handleOpenDeleteSubtaskDialog(index)}>Delete</MenuItem>
                                    </Menu>
                                </ListItem>
                            ))}
                        </List>
                    )}

                </Box>

                <Dialog open={openSubtaskDialog} onClose={handleClose} PaperProps={{
                    style: {
                        backgroundColor: '#171D1C',
                        color: 'white',
                    },
                }}>
                    <DialogTitle>Add Subtask</DialogTitle>
                    <Box sx={{ p: 2, mt: 1 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="subtask"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Subtask"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        multiline
                                        rows={6}
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
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}> {/* Ajoute une marge en haut (mt: 2) */}
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit" autoFocus>
                                    Save
                                </Button>
                            </Box>
                        </form>
                    </Box>

                </Dialog>

                {/* Boîte de dialogue de confirmation pour la suppression d'une sous-tâche */}
                <Dialog
                    open={openDeleteSubtaskDialog}
                    onClose={handleCloseDeleteSubtaskDialog}
                    PaperProps={{
                        style: {
                            backgroundColor: '#171D1C',
                            color: 'white',
                        },
                    }}
                >
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to remove this subtask?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteSubtaskDialog}>Cancel</Button>
                        <Button onClick={handleConfirmDeleteSubtask} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </Drawer >
    );
}

export default TaskDetails