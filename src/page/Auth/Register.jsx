import { Alert, Box, Button, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordConfirmation = () => setShowPasswordConfirmation((show) => !show);
    const navigate = useNavigate();
    const [authStatus, setAuthStatus] = useState(null);
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        emailError: false,
        passwordError: false,
        usernameError: false,
        passwordConfirmationError: false
    });

    const { username, email, password, passwordConfirmation, emailError, passwordError, usernameError, passwordConfirmationError } = state;

    function handleClick() {
        navigate("/")
    }

    const handleRegister = (event) => {
        event.preventDefault()

        if (username === '' || email === '' || password === '' || passwordConfirmation === '') {
            setState((prevState) => ({
                ...prevState,
                username: !prevState.username,
                email: !prevState.email,
                emailError: !prevState.emailError,
                passwordError: !prevState.passwordError,
                passwordConfirmationError: !prevState.passwordConfirmationError,
            }));
        } else if (password !== passwordConfirmation) {
            setAuthStatus("Passwords don't match");
        } else {


            console.log("New user registered " + username);
            navigate("/todo");
        }
    };

    return (
        <>
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                width: '100%',
                height: '100vh',
                bgcolor: '#98E4FF',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Paper sx={{
                    width: '80%',
                    height: '70%',
                    maxWidth: '1092px',
                    bgcolor: 'white',
                    borderRadius: '30px',
                    display: 'flex'
                }} elevation={5}>
                    <Box sx={{
                        flex: '1',
                        padding: '20px',
                        backgroundImage: 'url(https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?auto=format&fit=crop&q=80&w=2057&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                        backgroundSize: 'cover',
                        borderTopLeftRadius: '30px',
                        borderBottomLeftRadius: '30px',
                        display: { xs: 'none', sm: 'none', md: 'block' }
                    }}>
                    </Box>
                    <Box sx={{
                        flex: '1',
                        padding: '20px',
                        borderTopLeftRadius: { xs: '30px', md: '0px' },
                        borderBottomLeftRadius: { xs: '30px', md: '0px' },
                        borderTopRightRadius: '30px',
                        borderBottomRightRadius: '30px',
                        display: 'flex'
                    }}>
                        <Box sx={{
                            flex: '1',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>

                            <Typography variant="h4">Welcome</Typography>
                            <Typography variant="h6">Please complete the fields</Typography>

                            {authStatus && (
                                <Alert severity="error">{authStatus}</Alert>
                            )}

                            <form onSubmit={handleRegister}>

                                <TextField label="Username" fullWidth margin="normal" type="text" required placeholder="Username" sx={{ display: 'block' }} onChange={e => setState((prevState) => ({ ...prevState, username: e.target.value }))} value={username} error={usernameError} />
                                <TextField label="Email" fullWidth margin="normal" type="email" required placeholder="Email" sx={{ display: 'block' }} onChange={e => setState((prevState) => ({ ...prevState, email: e.target.value }))} value={email} error={emailError} />

                                <FormControl margin="normal" fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        fullWidth
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        error={passwordError}
                                        onChange={(e) => setState((prevState) => ({ ...prevState, password: e.target.value }))}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>

                                <FormControl margin="normal" fullWidth variant="outlined">
                                    <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="confirm-password"
                                        fullWidth
                                        type={showPasswordConfirmation ? 'text' : 'password'}
                                        required
                                        value={passwordConfirmation}
                                        error={passwordConfirmationError}
                                        onChange={(e) => setState((prevState) => ({ ...prevState, passwordConfirmation: e.target.value }))}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPasswordConfirmation}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>



                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    color='primary'
                                    type="submit"
                                    sx={{
                                        marginTop: '15px'
                                    }}>Register</Button>
                            </form>
                            <Box p={2}>
                                <Typography variant="paragraph"> Already have an account ? <Link onClick={handleClick} color="primary">
                                    Login
                                </Link></Typography>
                            </Box>


                        </Box>

                    </Box>

                </Paper >

            </Box >
        </>
    )
}

export default Register