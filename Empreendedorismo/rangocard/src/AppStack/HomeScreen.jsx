import React, { useEffect, useState } from 'react';

import { Box, Typography, Button } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Header from '../Components/Header';
import { API } from '../App';

const HomeScreen = () => {
    const navigate = useNavigate();
    let fistname = API.me.firstName;

    return (
        <Box sx={{ mx: 6, pt: 4 }}>
            <Header title={`Bem Vindo, ${fistname}`} />
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {/* <Grid item xs={10} sm={7} md={5} lg={2}>
                    <Button
                        sx={{
                            display: 'flex',
                            height: 100,
                            width: '100%',
                            p: 3,
                            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#F4F4F4',
                            border: 1,
                            borderColor: '#E2E2E2',
                            alignItems: 'center',
                        }}
                        onClick={() => navigate('add-value')}
                    >
                        <Typography color={'#434343'} fontWeight={'bold'}>
                            Adicionar Saldo
                        </Typography>
                    </Button>
                </Grid> */}
                <Grid item xs={10} sm={7} md={5} lg={2}>
                    <Button
                        sx={{
                            display: 'flex',
                            height: 100,
                            width: '100%',
                            p: 3,
                            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#F4F4F4',
                            border: 1,
                            borderColor: '#E2E2E2',
                            alignItems: 'center',
                        }}
                        onClick={() => navigate('prices')}
                    >
                        <Typography color={'#434343'} fontWeight={'bold'}>
                            Tabela de Preços
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={10} sm={7} md={5} lg={2}>
                    <Button
                        sx={{
                            display: 'flex',
                            height: 100,
                            width: '100%',
                            p: 3,
                            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#F4F4F4',
                            border: 1,
                            borderColor: '#E2E2E2',
                            alignItems: 'center',
                        }}
                        onClick={() => navigate('transactions')}
                    >
                        <Typography color={'#434343'} fontWeight={'bold'}>
                            Transações
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={10} sm={7} md={5} lg={2}>
                    <Button
                        sx={{
                            display: 'flex',
                            height: 100,
                            width: '100%',
                            p: 3,
                            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#F4F4F4',
                            border: 1,
                            borderColor: '#E2E2E2',
                            alignItems: 'center',
                        }}
                        onClick={() => navigate('clients')}
                    >
                        <Typography color={'#434343'} fontWeight={'bold'}>
                            Gerenciar Clientes
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={10} sm={7} md={5} lg={2}>
                    <Button
                        sx={{
                            display: 'flex',
                            height: 100,
                            width: '100%',
                            p: 3,
                            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#F4F4F4',
                            border: 1,
                            borderColor: '#E2E2E2',
                            alignItems: 'center',
                        }}
                        onClick={() => navigate('employees')}
                    >
                        <Typography color={'#434343'} fontWeight={'bold'}>
                            Gerenciar Funcionários
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={10} sm={7} md={5} lg={2}>
                    <Button
                        sx={{
                            display: 'flex',
                            height: 100,
                            width: '100%',
                            p: 3,
                            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#F4F4F4',
                            border: 1,
                            borderColor: '#E2E2E2',
                            alignItems: 'center',
                        }}
                        onClick={() => navigate('dashboard')}
                    >
                        <Typography color={'#434343'} fontWeight={'bold'}>
                            Dashboard
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};
export default HomeScreen;
