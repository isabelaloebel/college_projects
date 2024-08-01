import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    InputBase,
    styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import Header from '../Components/Header';

import CircularProgress from '@mui/material/CircularProgress';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { API } from '../App';

const TransactionsScreen = () => {
    const [isLoading, setIsLoading] = useState(true);

    const StyledDataGrid = styled(DataGrid)({
        '& .negative': {
            backgroundColor: '#ECAFAF',
        },
        '& .positive': {
            backgroundColor: '#ABC4A1',
        },
    });

    const columns = [
        {
            field: 'customer',
            headerName: 'Nome',
            flex: 1,
            sortable: false,
            disableColumnSort: true,
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
            field: 'value',
            headerName: 'Valor',
            flex: 1,
            sortable: false,
            disableColumnSort: true,
            cellClassName: (params) =>
                params.value.startsWith('-') ? 'negative' : 'positive',
        },
        {
            field: 'createdAt',
            headerName: 'Data',
            flex: 1,
            sortable: false,
            disableColumnSort: true,
            valueGetter: (params) => {
                let anoMes_str = params.split('-');
                let dia_str = anoMes_str[2].split('T');
                let horas_str = dia_str[1].split(':');

                let ano = Number(anoMes_str[0]);
                let mes = Number(anoMes_str[1]);
                let dia = Number(dia_str[0]);
                let hora = Number(horas_str[0]);
                let minuto = Number(horas_str[1]);

                // Crie uma data com o horário específico em UTC
                let date = new Date(Date.UTC(ano, mes, dia, hora, minuto));

                // Converta a data para o fuso horário de São Paulo
                let zonedDate = toZonedTime(date, 'America/Sao_Paulo');

                let time = format(zonedDate, 'dd/MM/yyyy - HH:mm');

                return time;
            },
        },
    ];
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                API.api(
                    'GET',
                    '/company/1/transactions',
                    {},
                    (status, response) => {
                        if (status === 200) {
                            console.log(response.results);
                            setTransactions(response.results);
                            setIsLoading(false);
                        } else {
                            alert(response.message);
                        }
                    }
                );
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return (
        <Box sx={{ mx: 6, pt: 4 }}>
            <Header title={'Histórico de Transações'} />
            <Box display="flex" justifyContent="center">
                {isLoading ? (
                    <Box>
                        <CircularProgress
                            variant="indeterminate"
                            sx={{
                                color: '#D06400',
                            }}
                        />
                    </Box>
                ) : (
                    <Box height="80vh" width="100%">
                        <StyledDataGrid
                            rows={transactions}
                            columns={columns}
                            pagination={true}
                            autoPageSize={true}
                            getRowId={(row) => row.transactionId}
                            sx={{
                                border: 'none',
                                backgroundColor: '#F4F4F4',
                                boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',

                                '& .Mui-selected.MuiDataGrid-row': {
                                    fontWeight: 'bold',
                                    color: '#D06400',
                                    backgroundColor: '#D2B294',
                                },
                            }}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};
export default TransactionsScreen;
