import { Alert, Box, Button, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import users from "../../utils/users";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const navigate = useNavigate();
    const [authStatus, setAuthStatus] = useState(null);
    const [state, setState] = useState({
        email: '',
        password: '',
        emailError: false,
        passwordError: false,
    });

    const { email, password, emailError, passwordError } = state;

    function handleClick() {
        navigate("/register")
    }


    const handleLogin = (event) => {
        event.preventDefault()

        setState((prevState) => ({
            ...prevState,
            emailError: !prevState.emailError,
            passwordError: !prevState.passwordError,
        }));


        if (email == '') {
            setState((prevState) => (
                {
                    ...prevState,
                    emailError: true
                }
            ))
        }
        if (password == '') {
            setState((prevState) => (
                {
                    ...prevState,
                    passwordError: true
                }))
        }

        if (email && password) {
            console.log(email, password)
        }

        const enteredEmail = email;
        const enteredPassword = password;
        const user = users.find((user) => user.email === enteredEmail);

        if (user) {
            if (user.password === enteredPassword) {
                console.log('Authentification réussie');
                navigate("/todo")
            } else {
                // Afficher un message d'erreur pour un mot de passe incorrect
                setAuthStatus('Mot de passe incorrect');
            }
        } else {
            // Afficher un message d'erreur pour un email incorrect
            setAuthStatus('Email incorrect');
        }


    }


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
                            alignItems: 'center'
                        }}>

                            <Typography variant="h4">Welcome back</Typography>
                            <Typography variant="h6">Login to Explore</Typography>

                            {authStatus && (
                                <Alert severity="error">{authStatus}</Alert>
                            )}

                            <form onSubmit={handleLogin}>
                                <FormControl margin="normal" fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        fullWidth
                                        type="email"
                                        sx={{ display: 'block' }}
                                        onChange={e => setState((prevState) => ({ ...prevState, email: e.target.value }))}
                                        value={email}
                                        error={emailError}
                                        label="Password"
                                    />
                                </FormControl>

                                <FormControl margin="normal" fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        fullWidth
                                        type={showPassword ? 'text' : 'password'}
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

                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    color='primary'
                                    type="submit"
                                    sx={{
                                        marginTop: '15px'
                                    }}>Login</Button>
                            </form>
                            <Box p={2}>
                                <Typography variant="paragraph"> New user ? <Link onClick={handleClick} color="primary">
                                    Signup now
                                </Link></Typography>
                            </Box>


                        </Box>

                    </Box>

                </Paper >

            </Box >
        </>
    )
}

export default Auth