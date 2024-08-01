import { Box, Typography, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import logo from '../../public/assets/imgs/logo.png';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { API } from '../App';

const LoginScreen = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const validate = () => {
        let result = true;
        if (username === '') {
            result = false;
            alert('Digite seu usuário!');
        }
        if (password === '') {
            result = false;
            alert('Digite sua senha!');
        }
        return result;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validate()) {
            if (username && password) {
                API.api(
                    'POST',
                    '/auth',
                    { identifier: username, password: password },
                    (status, response) => {
                        if (status === 200) {
                            localStorage.setItem(
                                'token',
                                response.authorization
                            );
                            localStorage.setItem('userId', response.userId);
                            console.log(localStorage);
                            API.init(response.userId, response.authorization);
                            API.api('GET', '/me', {}, (status, response) => {
                                if (status === 200) {
                                    API.me = response;
                                    onLogin();
                                    navigate('/companies');
                                } else {
                                    alert(response.message);
                                }
                            });
                        } else {
                            alert(response.message);
                        }
                    }
                );
            }
        }
    };

    return (
        <Box
            position="absolute"
            display="flex"
            flexDirection="column"
            height="95%"
            alignItems="center"
            justifyContent="center"
        >
            <Box textAlign="center">
                <img
                    alt="logo."
                    src={process.env.PUBLIC_URL + '/assets/imgs/logo.png'}
                    width={'20%'}
                />
                <Typography variant="h5">Login</Typography>
            </Box>
            <Box display="flex" flexDirection="column">
                <form
                    onSubmit={handleLogin}
                    style={{
                        width: '100%',
                    }}
                >
                    <Box display="flex" alignItems="flex-end" mt={2}>
                        <PersonIcon fontSize="medium" />
                        <TextField
                            type="text"
                            variant="standard"
                            label="Usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            size="small"
                            sx={{ ml: '5px' }}
                        />
                    </Box>
                    <Box display="flex" alignItems="flex-end" mt={2}>
                        <KeyOutlinedIcon fontSize="medium" />
                        <TextField
                            type="password"
                            variant="standard"
                            label="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size="small"
                            sx={{ ml: '5px' }}
                        />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 2,
                            width: '100%',
                            backgroundColor: '#FF7A00',
                            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        Entrar
                    </Button>
                </form>
            </Box>
        </Box>
    );
};
export default LoginScreen;
