/* eslint-disable react/prop-types */
import { MoreVert, StarOutlineOutlined } from '@mui/icons-material'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import TaskDetails from './TaskDetails'
import { useState } from 'react';

const Task = ({ task, toggleTaskCompleted, handleTaskClick, handleDeleteTask, open, onClose, selectedTask, updateTask, tasks }) => {




    // More vert dots
    const [anchorEl, setAnchorEl] = useState(null);
    const openMore = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    //Delete dialog
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    //abc
    const handleTypographyClick = () => {
        handleTaskClick(task)
    };

    //Edit the task
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
            ...task,
            text: editedText,
        };

        updateTask(updatedTask);

        handleCloseEditDialog();
    }

    return (


        <Paper
            sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "10px",
                backgroundColor: "#171D1C",
                marginBottom: "10px",
                cursor: "pointer",
                color: task.completed ? "gray" : "white",
                textDecoration: task.completed ? "line-through" : "none",
            }}
        >
            <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
                <Checkbox
                    checked={task.completed}
                    onClick={() => toggleTaskCompleted(task.id)}
                    sx={{
                        marginRight: "10px",

                        color: "white",
                    }}
                />

                <Typography variant="paragraph" sx={{
                    flexGrow: 1, alignItems: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    "WebkitLineClamp": '1',
                    "WebkitBoxOrient": "vertical"
                }} onClick={handleTypographyClick}>{task.text}</Typography>
                <IconButton sx={{ color: "white" }} >
                    <StarOutlineOutlined />
                </IconButton>
                <IconButton sx={{ color: "white" }} onClick={handleClick}>
                    <MoreVert sx={{ color: "white" }} />
                </IconButton>
                <Menu
                    id="action-menu"
                    anchorEl={anchorEl}
                    open={openMore}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'more-button',
                    }}
                    s sx={{
                        "& .MuiPaper-root": {
                            backgroundColor: "#171D1C"
                        }
                    }}
                >
                    <MenuItem sx={{ color: "white" }} onClick={handleEditClick}>Edit</MenuItem>
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
                    <MenuItem sx={{ color: "white" }} onClick={handleClickOpenDialog}>Delete</MenuItem>
                </Menu>
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    PaperProps={{
                        style: {
                            backgroundColor: '#171D1C',
                            color: 'white'
                        },
                    }}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={{ color: "white" }}>
                            Do you want to delete this task ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={() => handleDeleteTask(task.id)} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Stack>

            <TaskDetails key={task.id} task={selectedTask || {}} open={open} onClose={onClose} toggleTaskCompleted={toggleTaskCompleted} handleClickOpenDialog={handleClickOpenDialog} updateTask={updateTask} tasks={tasks} handleEdit={handleEditClick} />
        </Paper>
    )
}

export default Task