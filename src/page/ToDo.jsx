import { Box, CssBaseline, IconButton, Stack, TextField } from "@mui/material"
import ProjectBar from "../components/ProjectBar"
import TopBar from "../components/TopBar"
import { useState } from "react"
import { Add } from "@mui/icons-material"
import Task from "../components/Task"
import { v4 as uuidv4 } from 'uuid'


const ToDo = () => {

    //selected project
    const [selectedProject, setSelectedProject] = useState(null)

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    //State management of tasks
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");

    const handleAddTask = () => {
        if (taskText.trim() !== "" && selectedProject) {
            setTasks([...tasks, { id: uuidv4(), text: taskText, completed: false, priority: "Normal", projectId: selectedProject.id, assignedUsers: [], subtasks: [] }]);
            setTaskText("");
        }
    };

    const updateTask = (updatedTask) => {
        // Mettez à jour l'état des tâches dans votre composant parent
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        )

        console.log(tasks);
    };

    const handleTaskTextChange = (event) => {
        setTaskText(event.target.value);
    };

    const toggleTaskCompleted = (taskId) => {
        const taskToUpdate = tasks.find(task => task.id === taskId);
        if (taskToUpdate) {
            const updatedTasks = tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            );
            setTasks(updatedTasks)
        }
    }

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [selectedTask, setSelectedTask] = useState(null);
    const [isTaskDetailsOpen, setTaskDetailsOpen] = useState(false);

    const handleTaskClick = (task) => {
        setTaskDetailsOpen(true)
        setSelectedTask(task)
    };

    const handleTaskDetailsClose = () => {
        setTaskDetailsOpen(false);
    };

    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => {
            return prevTasks.filter((task) => task.id !== taskId)
        })

        handleTaskDetailsClose()
    }

    return (
        <>
            <CssBaseline />
            <Box className="app">
                <ProjectBar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} onProjectClick={handleProjectClick} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
                <Stack direction="column" height="100vh" width="100%" sx={{ backgroundImage: 'url(https://images.unsplash.com/photo-1650174625318-c42be129a884?auto=format&fit=crop&q=80&w=1923&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover' }} >
                    <TopBar handleDrawerToggle={handleDrawerToggle} selectedProject={selectedProject} />


                    <Stack direction="column"
                        sx={{
                            display: 'flex', flexGrow: '1', gap: '0.5em',
                            flexDirection: 'column', padding: { xs: 7, sm: 10 }, maxWidth: { sm: "calc(100vw - 300px)", overflowY: "scroll" }
                        }} >
                        {tasks
                            .filter(task => task.projectId === selectedProject.id)
                            .map((task) => (
                                <Task
                                    key={task.id}
                                    task={task}
                                    toggleTaskCompleted={toggleTaskCompleted}
                                    handleTaskClick={handleTaskClick}
                                    handleDeleteTask={handleDeleteTask}
                                    open={isTaskDetailsOpen}
                                    onClose={handleTaskDetailsClose}
                                    selectedTask={selectedTask}
                                    updateTask={updateTask}
                                    tasks={tasks}
                                />
                            ))}
                    </Stack>
                    <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                        <TextField
                            sx={{
                                backgroundColor: '#171D1C',
                                width: "75%",
                                borderRadius: 5,
                                '& fieldset': {
                                    borderRadius: 5,
                                },
                                boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.3)'
                            }}
                            variant="outlined"
                            label="Add task "
                            InputProps={{
                                style: { color: "white" },
                                endAdornment: (
                                    <IconButton onClick={handleAddTask} sx={{ color: "white" }}>
                                        <Add />
                                    </IconButton>
                                ),
                            }}
                            InputLabelProps={{ style: { color: 'white' } }}
                            value={taskText}
                            onChange={handleTaskTextChange}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    handleAddTask();
                                }
                            }}
                        />
                    </Box>
                </Stack >
            </Box >
        </>
    )
}

export default ToDo