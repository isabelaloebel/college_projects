import { useState, useEffect, useRef } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { API } from '../App';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Groups2Icon from '@mui/icons-material/Groups2';
import BadgeIcon from '@mui/icons-material/Badge';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';

const Item = ({ title, page, icon, props }) => {
    return (
        <MenuItem
            icon={icon}
            style={{
                color: '#434343',
                '&:hover': {
                    backgroundColor: '#ff0000',
                },
            }}
            onClick={() => {
                props.onChangeRoute(page);
            }}
        >
            <Typography style={{ whiteSpace: 'pre-wrap' }}>{title}</Typography>
        </MenuItem>
    );
};

const MenuSidebar = (props) => {
    return (
        <Sidebar
            backgroundColor="white"
            style={{
                width: '270px',
                height: '100%',
                boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Menu>
                {/* LOGO */}
                <Box
                    display="flex"
                    justifyContent="center"
                    alignContent="center"
                    ml="15px"
                    pt={1}
                >
                    <img
                        alt="logo"
                        src={process.env.PUBLIC_URL + '/assets/imgs/logo.png'}
                        width="80%"
                    />
                </Box>
            </Menu>

            <Menu>
                {/* USER */}
                <Box pt={3} mb="25px">
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <img
                            alt="profile-user"
                            width="100px"
                            height="100px"
                            src={
                                process.env.PUBLIC_URL +
                                '/assets/imgs/profile.png'
                            }
                            style={{
                                borderRadius: '50%',
                            }}
                        />
                    </Box>

                    <Box textAlign="center">
                        <Typography
                            variant="h6"
                            color="#434343"
                            fontWeight="bold"
                            sx={{ m: '10px' }}
                        >
                            {API.me.firstName} {API.me.lastName}
                        </Typography>
                    </Box>
                </Box>
            </Menu>

            <Menu>
                {/* Menu Items */}
                <Item
                    title="Início"
                    page=""
                    icon={<HomeOutlinedIcon />}
                    props={props}
                />
                {/* <Item
                    title="Adicionar Saldo"
                    page="add-value"
                    icon={<MonetizationOnIcon />}
                    props={props}
                /> */}
                <Item
                    title="Tabela de Preços"
                    page="prices"
                    icon={<PriceChangeOutlinedIcon />}
                    props={props}
                />
                <Item
                    title="Transações"
                    page="transactions"
                    icon={<PriceChangeOutlinedIcon />}
                    props={props}
                />
                <Item
                    title="Gerenciar Clientes"
                    page="clients"
                    icon={<Groups2Icon />}
                    props={props}
                />
                <Item
                    title="Gerenciar Funcionários"
                    page="employees"
                    icon={<BadgeIcon />}
                    props={props}
                />
                <Item
                    title="Dashboard"
                    page="dashboard"
                    icon={<QueryStatsIcon />}
                    props={props}
                />
            </Menu>

            <Menu flexGrow={1}>
                {/* LOGOUT */}
                <IconButton onClick={props.onLogout}>
                    <LogoutOutlinedIcon /> <Typography>SAIR</Typography>
                </IconButton>
            </Menu>
        </Sidebar>
    );
};
export default MenuSidebar;
