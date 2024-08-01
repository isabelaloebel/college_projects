import React, { useEffect, useState, useRef } from 'react';
import {
    Box,
    IconButton,
    InputBase,
    InputAdornment,
    Typography,
    Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { API } from '../App';
import Header from '../Components/Header';
import RealInput from '../Components/RealInput';

import CircularProgress from '@mui/material/CircularProgress';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useParams } from 'react-router-dom';

const BalanceScreen = () => {
    const { companyId } = useParams();
    const [realValue, setRealValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [clients, setClients] = useState([]);
    const [clearInput, setClearInput] = useState(false);

    const searchRef = useRef(null);
    const valueRef = useRef(null);
    const saveBtnRef = useRef(null);

    const localeText = {
        noRowsLabel: 'Sem consultas ainda.',
    };
    const columns = [
        {
            field: 'user',
            headerName: 'Nome',
            flex: 1,
            filterable: false,
            disableColumnFilter: true,
            sortable: false,
            disableColumnSort: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            valueGetter: (params) => {
                return (
                    params.firstName.charAt(0).toUpperCase() +
                    params.firstName.slice(1) +
                    ' ' +
                    params.lastName.charAt(0).toUpperCase() +
                    params.lastName.slice(1)
                );
            },
        },
        {
            field: 'companyPriceTable',
            headerName: 'Tipo e Preço',
            flex: 1,
            filterable: false,
            disableColumnFilter: true,
            sortable: false,
            disableColumnSort: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            valueGetter: (params) => {
                return params.name + ' - ' + params.price;
            },
        },
        {
            field: 'customerId',
            headerName: 'Saldo',
            flex: 1,
            filterable: false,
            disableColumnFilter: true,
            sortable: false,
            disableColumnSort: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            // type: 'actions',
        },
    ];

    const handleSetValue = (value) => {
        setRealValue(value);
    };

    const handleSearchKeyDown = (e) => {
        API.api(
            'GET',
            `/company/${companyId}/customers`,
            { q: e.target.value },
            (status, response) => {
                if (status === 200) {
                    setClients(response.results);
                } else {
                    alert(response.message);
                }
            }
        );
        if (e.key === 'Enter') {
            valueRef.current.focus();
        }
    };

    const handleValueKeyDown = (e) => {
        if (e.key === 'Enter') {
            saveBtnRef.current.focus();
        }
    };

    const handleAddValue = async (e) => {
        let v = realValue.replace(',', '.');
        setIsLoading(true);
        e.preventDefault();
        API.api(
            'POST',
            `/company/1/customer/${clients[0].customerId}/credit`,
            { value: v },
            (status, response) => {
                setIsLoading(false);
                if (status === 200) {
                    toast.success(
                        `Saldo de ${response.customer.firstName} inserido com sucesso!`,
                        {
                            className: 'toast-success-custom',
                            style: {
                                backgroundColor: 'green',
                                color: 'white',
                            },
                        }
                    );
                    setRealValue('');
                    setClearInput(true);
                    searchRef.current.value = '';
                    setClients('');
                } else {
                    toast.error(`Erro ao inserir saldo.`, {
                        className: 'toast-error-custom',
                        style: {
                            backgroundColor: 'red',
                            color: 'white',
                        },
                    });
                }
            }
        );
    };

    return (
        <Box sx={{ mx: 6, pt: 4 }}>
            <Header title={'Adicionar Saldo'} />
            <Box borderRadius="3px">
                <InputBase
                    inputRef={searchRef}
                    autoFocus={true}
                    onKeyDown={handleSearchKeyDown}
                    sx={{
                        width: '100%',
                        pl: 2,
                        borderRadius: 5,
                        border: 1,
                        borderColor: '#B0B0B0',
                        backgroundColor: '#F4F4F4',
                    }}
                    placeholder="Buscar"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton color="#434343" sx={{ p: 1 }}>
                                <SearchOutlinedIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    onChange={(e) => {
                        API.api(
                            'GET',
                            `/company/${companyId}/customers`,
                            { q: e.target.value },
                            (status, response) => {
                                if (status === 200) {
                                    setClients(response.results);
                                } else {
                                    alert(response.message);
                                }
                            }
                        );
                    }}
                />
            </Box>

            <Box display="flex" pt={3}>
                <Box height="13vh" width="100%">
                    <DataGrid
                        rows={clients}
                        columns={columns}
                        pagination={true}
                        autoPageSize={true}
                        hideFooter
                        localeText={localeText}
                        getRowId={(row) => row.customerId.toString()}
                        sx={{
                            border: 'none',
                            backgroundColor: '#F4F4F4',
                        }}
                    />
                </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={3}>
                <Typography>Valor:</Typography>
                <RealInput
                    inputRef={valueRef}
                    onKeyDown={handleValueKeyDown}
                    onValueChange={handleSetValue}
                    clearInput={clearInput}
                    onClear={() => setClearInput(false)}
                />
            </Box>
            <Box display="flex" mt={3}>
                <Button
                    ref={saveBtnRef}
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                        backgroundColor: '#2EB300',
                        ml: 2,
                        '&:hover': {
                            backgroundColor: '#D06400',
                            boxShadow: 'none',
                        },
                    }}
                    onClick={handleAddValue}
                >
                    <Typography>Salvar</Typography>
                </Button>
                <ToastContainer
                    position="top-center"
                    autoClose={1500}
                    newestOnTop={true}
                    rtl={false}
                />
            </Box>
        </Box>
    );
};
export default BalanceScreen;
