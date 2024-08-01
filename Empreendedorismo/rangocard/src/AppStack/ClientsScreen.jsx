import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    InputBase,
    Modal,
    NativeSelect,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { API } from '../App';
import Header from '../Components/Header';
import RealInput from '../Components/RealInput';

import CircularProgress from '@mui/material/CircularProgress';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

const ClientsScreen = () => {
    const { companyId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSelection, setIsLoadingSelection] = useState(true);
    const [isLoadingAddValue, setIsLoadingAddValue] = useState(false);
    const [isLoadingEditClient, setIsLoadingEditClient] = useState(false);
    const [isLoadingLinkCard, setIsLoadingLinkCard] = useState(false);
    const [isLoadingPost, setIsLoadingPost] = useState(false);

    const [showModalNewClient, setShowModalNewClient] = useState(false);
    const [showModalAddValue, setShowModalAddValue] = useState(false);
    const [showModalEditClient, setShowModalEditClient] = useState(false);

    const [rowSelection, setRowSelection] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [clients, setClients] = useState([]);
    const [priceTables, setPriceTables] = useState([]);

    const [value, setValue] = useState('');
    const [selectedType, setSelectedType] = useState(null);

    const [price, setPrice] = useState('');

    const [clearInput, setClearInput] = useState(false);

    const searchRef = useRef(null);
    const searchAllRef = useRef(null);
    const valueRef = useRef(null);
    const saveBtnRef = useRef(null);
    const linkBtnRef = useRef(null);

    const style = {
        width: '40%',
        position: 'absolute',
        top: '10%',
        borderRadius: 5,
        boxShadow: 20,
        px: 5,
        py: 3,
        bgcolor: 'white',
    };

    const styleNewClient = {
        width: '60%',
        position: 'absolute',
        top: '10%',
        borderRadius: 5,
        boxShadow: 20,
        px: 5,
        py: 3,
        bgcolor: 'white',
    };

    const columns = [
        {
            field: 'user',
            headerName: 'Nome',
            flex: 1,
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
            valueGetter: (params) => {
                return params.name + ' - ' + params.price;
            },
        },
        {
            field: 'costumerId',
            headerName: '',
            flex: 1,
            filterable: false,
            disableColumnFilter: true,
            sortable: false,
            disableColumnSort: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            align: 'right',
            type: 'actions',

            getActions: (params) => [
                <Box>
                    {/* ADD VALUE ICONBUTTON */}
                    <IconButton
                        onClick={() => {
                            console.log(params.row);
                            setRowSelection(params.row);
                            setShowModalAddValue(true);
                            setIsLoadingSelection(false);
                            //     API.api(
                            //         'POST',
                            //         `/company/${companyId}/customer/${params.costumerId}/credit`,
                            //         { value: value },
                            //         (status, response) => {
                            //             if (status === 200) {
                            //                 alert('Saldo Creditado Com Sucesso!');
                            //             } else {
                            //                 alert(response.message);
                            //             }
                            //         }
                            //     );
                        }}
                    >
                        <AddCircleIcon sx={{ color: '#D06400' }} />
                    </IconButton>

                    {/* EDIT CLIENT ICONBUTTON  tem q fazer o modal*/}
                    <IconButton
                        onClick={() => {
                            console.log('params.row =', params.row);
                            setRowSelection(params.row);
                            console.log(
                                'params.row.companyPriceTable =',
                                params.row.companyPriceTable
                            );
                            // setSelectedType(params.row.companyPriceTable);
                            API.api(
                                'GET',
                                `/company/${companyId}/price-tables`,
                                {},
                                (status, response) => {
                                    if (status === 200) {
                                        console.log(
                                            'price = ',
                                            response.results
                                        );
                                        setPriceTables(response.results);
                                        setShowModalEditClient(true);
                                        setIsLoadingSelection(false);
                                    } else {
                                        alert(response.message);
                                    }
                                }
                            );
                        }}
                    >
                        <BorderColorRoundedIcon sx={{ color: '#D06400' }} />
                    </IconButton>
                </Box>,
            ],
        },
    ];

    const handleSetValue = (value) => {
        setValue(value);
    };

    const handleValueKeyDown = (e) => {
        if (e.key === 'Enter') {
            saveBtnRef.current.focus();
        }
    };

    const handleAddValue = async (e) => {
        console.log('value = ', value);
        let v = value.replace('.', '');
        v = v.replace(',', '.');
        setIsLoadingAddValue(true);
        e.preventDefault();
        API.api(
            'POST',
            `/company/${companyId}/customer/${rowSelection.customerId}/credit`,
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
                    setValue('');
                    setClearInput(true);
                    setIsLoadingAddValue(false);
                    setShowModalAddValue(false);
                } else {
                    toast.error(`Erro ao inserir saldo.`, {
                        className: 'toast-error-custom',
                        style: {
                            backgroundColor: 'red',
                            color: 'white',
                        },
                    });
                    setIsLoadingAddValue(false);
                }
            }
        );
    };

    const handleLinkCard = async (e) => {
        setIsLoadingLinkCard(true);
        // falta kevin fazer a chamada
        // e.preventDefault();
        // API.api(
        //     'POST',
        //     `/company/${companyId}/customer/${rowSelection.customerId}/credit`,
        //     { value: v },
        //     (status, response) => {
        //         setIsLoading(false);
        //         if (status === 200) {
        //             toast.success(
        //                 `Saldo de ${response.customer.firstName} inserido com sucesso!`,
        //                 {
        //                     className: 'toast-success-custom',
        //                     style: {
        //                         backgroundColor: 'green',
        //                         color: 'white',
        //                     },
        //                 }
        //             );
        //             setIsLoadingLinkCard(false);
        //         } else {
        //             toast.error(`Erro ao inserir saldo.`, {
        //                 className: 'toast-error-custom',
        //                 style: {
        //                     backgroundColor: 'red',
        //                     color: 'white',
        //                 },
        //             });
        //             setIsLoadingLinkCard(false);
        //         }
        //     }
        // );
    };

    const handleUpdateClient = async (e) => {
        setIsLoadingEditClient(true);
        // falta kevin fazer a chamada
        // e.preventDefault();
        // API.api(
        //     'POST',
        //     `/company/${companyId}/customer/${rowSelection.customerId}/credit`,
        //     { value: v },
        //     (status, response) => {
        //         setIsLoading(false);
        //         if (status === 200) {
        //             toast.success(
        //                 `Saldo de ${response.customer.firstName} inserido com sucesso!`,
        //                 {
        //                     className: 'toast-success-custom',
        //                     style: {
        //                         backgroundColor: 'green',
        //                         color: 'white',
        //                     },
        //                 }
        //             );
        //
        //             setIsLoadingEditClient(false);
        //             setShowModalAddValue(false);
        //         } else {
        //             toast.error(`Erro ao inserir saldo.`, {
        //                 className: 'toast-error-custom',
        //                 style: {
        //                     backgroundColor: 'red',
        //                     color: 'white',
        //                 },
        //             });
        //             setIsLoadingEditClient(false);
        //         }
        //     }
        // );
    };

    useEffect(() => {
        (async function () {
            try {
                API.api(
                    'GET',
                    `/company/${companyId}/customers`,
                    {},
                    (status, response) => {
                        if (status === 200) {
                            setClients(response.results);
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
            {/* INITIAL SCREEN AND ELEMENTS */}
            <Header title={'Gerenciar Clientes'} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <InputBase
                    inputRef={searchRef}
                    autoFocus={true}
                    sx={{
                        width: '80%',
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
                    // onKeyDown={(event) => {
                    //     if (event.key === 'Enter') {
                    //         API.api(
                    //             'GET',
                    //             `/company/${companyId}/customers`,
                    //             { q: searchRef.current.value },
                    //             (status, response) => {
                    //                 if (status === 200) {
                    //                     console.log(
                    //                         'busca = ',
                    //                         response.results
                    //                     );
                    //                     setClients(response.results);
                    //                 } else {
                    //                     alert(response.message);
                    //                 }
                    //             }
                    //         );
                    //     }
                    // }}
                    onChange={(e) => {
                        API.api(
                            'GET',
                            `/company/${companyId}/customers`,
                            { q: e.target.value },
                            (status, response) => {
                                if (status === 200) {
                                    console.log('busca = ', response.results);
                                    setClients(response.results);
                                } else {
                                    alert(response.message);
                                }
                            }
                        );
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            py: 1,
                            backgroundColor: '#D06400',
                            '&:hover': {
                                backgroundColor: '#D06400',
                                boxShadow: 'none',
                            },
                        }}
                        onClick={() => {
                            API.api(
                                'GET',
                                `/company/${companyId}/price-tables`,
                                {},
                                (status, response) => {
                                    if (status === 200) {
                                        console.log(
                                            'price = ',
                                            response.results
                                        );
                                        setPriceTables(response.results);
                                        setShowModalNewClient(true);
                                    } else {
                                        alert(response.message);
                                    }
                                }
                            );
                        }}
                    >
                        <PersonAddAltOutlinedIcon />
                        <Typography pl={1}>Vincular cliente</Typography>
                    </Button>
                </Box>
            </Box>

            <Box display="flex" justifyContent="center" pt={3}>
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
                    <Box height="75vh" width="100%">
                        <DataGrid
                            rows={clients}
                            columns={columns}
                            pagination={true}
                            autoPageSize={true}
                            getRowId={(row) => row.customerId.toString()}
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
                        <ToastContainer
                            position="top-center"
                            autoClose={1500}
                            newestOnTop={true}
                            rtl={false}
                        />
                    </Box>
                )}
            </Box>

            {/* ADD NEW CLIENT MODAL falta chamada da api*/}
            <Modal
                open={showModalNewClient}
                onClose={() => setShowModalNewClient(false)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                }}
            >
                <Box sx={styleNewClient}>
                    <Box
                        sx={{
                            width: '100%',
                            textAlign: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    justifyContent: 'center',
                                    color: '#434343',
                                    fontWeight: 'bold',
                                }}
                            >
                                Vincular Cliente
                            </Typography>
                        </Box>
                        <Box mt={2}>
                            <InputBase
                                inputRef={searchAllRef}
                                autoFocus={true}
                                sx={{
                                    width: '80%',
                                    pl: 2,
                                    borderRadius: 5,
                                    border: 1,
                                    borderColor: '#B0B0B0',
                                    backgroundColor: '#F4F4F4',
                                }}
                                placeholder="Buscar por CPF ou e-mail"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            color="#434343"
                                            sx={{ p: 1 }}
                                        >
                                            <SearchOutlinedIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onChange={(event) => {
                                    API.api(
                                        'GET',
                                        `/company/${companyId}/customers`,
                                        { q: event.current.value },
                                        (status, response) => {
                                            if (status === 200) {
                                                console.log(
                                                    'busca = ',
                                                    response.results
                                                );
                                                setSelectedUser(
                                                    response.results
                                                );
                                            } else {
                                                alert(response.message);
                                            }
                                        }
                                    );
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        saveBtnRef.current.focus();
                                    }
                                }}
                            />
                        </Box>
                        <Box mt={2}>
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="h6" fontWeight="bold">
                                    Nome:
                                </Typography>
                                <Typography
                                    pl={1}
                                    variant="h6"
                                    fontStyle="italic"
                                >
                                    {selectedUser.firstName}{' '}
                                    {selectedUser.lastName}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="h6" fontWeight="bold">
                                    CPF:
                                </Typography>
                                <Typography
                                    pl={1}
                                    variant="h6"
                                    fontStyle="italic"
                                >
                                    {selectedUser.cpf}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="h6" fontWeight="bold">
                                    E-mail:
                                </Typography>
                                <Typography
                                    pl={1}
                                    variant="h6"
                                    fontStyle="italic"
                                >
                                    {selectedUser.email}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    mt: 2,
                                }}
                            >
                                <NativeSelect
                                    onChange={(event) => {
                                        const typeId = event.target.value;

                                        setSelectedType(
                                            priceTables.find(
                                                (k) =>
                                                    k.companyPriceTableId ===
                                                    parseInt(typeId)
                                            ) ?? null
                                        );
                                    }}
                                >
                                    <option key={0} value={0}>
                                        Selecionar tipo...
                                    </option>
                                    {priceTables.map((priceTable) => (
                                        <option
                                            key={priceTable.companyPriceTableId}
                                            value={
                                                priceTable.companyPriceTableId
                                            }
                                        >
                                            {priceTable.name}
                                        </option>
                                    ))}
                                </NativeSelect>

                                <Typography
                                    sx={{
                                        pl: 2,
                                        fontStyle: 'italic',
                                        pt: 1,
                                    }}
                                >
                                    Preço: R${' '}
                                    {selectedType ? selectedType.price : '--'}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                mt: 2,
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#B0B0B0',
                                    ml: 2,
                                    '&:hover': {
                                        backgroundColor: '#D06400',
                                        boxShadow: 'none',
                                    },
                                }}
                                onClick={() => {
                                    setShowModalNewClient(false);
                                }}
                            >
                                <Typography>Cancelar</Typography>
                            </Button>
                            {/* <Button
                                ref={linkBtnRef}
                                variant="contained"
                                sx={{
                                    backgroundColor: '#D06400',
                                    ml: 2,
                                    '&:hover': {
                                        backgroundColor: '#D06400',
                                        boxShadow: 'none',
                                    },
                                }}
                                onClick={handleLinkCard}
                                disabled={isLoadingLinkCard}
                            >
                                <Typography>Vincular crachá</Typography>
                            </Button> */}
                            <Button
                                ref={saveBtnRef}
                                disabled={isLoadingPost}
                                variant="contained"
                                sx={{
                                    backgroundColor: '#2EB300',
                                    ml: 2,
                                    '&:hover': {
                                        backgroundColor: '#D06400',
                                        boxShadow: 'none',
                                    },
                                }}
                                onClick={() => {
                                    setIsLoading(true);
                                    setIsLoadingPost(true);
                                    //falta verificar essa chamada
                                    API.api(
                                        'POST',
                                        `/company/${companyId}/customer/${rowSelection.userId}`,
                                        {
                                            id: selectedUser.userId,
                                            companyPriceTable:
                                                selectedType.companyPriceTableId,
                                        },
                                        (status, response) => {
                                            setIsLoading(false);

                                            if (status === 200) {
                                                console.log(response);
                                                toast.success(
                                                    `Usuário vinculado com sucesso!\n Nome : ${response.name}\n preço: R$${response.price}.`,
                                                    {
                                                        className:
                                                            'toast-success-custom',
                                                        style: {
                                                            backgroundColor:
                                                                'green',
                                                            color: 'white',
                                                        },
                                                    }
                                                );
                                                setIsLoadingPost(false);
                                                setShowModalNewClient(false);
                                            } else {
                                                toast.error(
                                                    `Erro ao vincular usuário.`,
                                                    {
                                                        className:
                                                            'toast-error-custom',
                                                        style: {
                                                            backgroundColor:
                                                                'red',
                                                            color: 'white',
                                                        },
                                                    }
                                                );
                                                setIsLoadingPost(false);
                                            }
                                        }
                                    );
                                }}
                            >
                                <Typography>Salvar</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            {/* ADD VALUE TO A CLIENT MODAL */}
            {isLoadingSelection === false ? (
                <Modal
                    open={showModalAddValue}
                    onClose={() => setShowModalAddValue(false)}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                    }}
                >
                    <Box sx={style}>
                        <Box
                            sx={{
                                width: '100%',
                                textAlign: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        justifyContent: 'center',
                                        color: '#434343',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Adicionar Saldo
                                </Typography>
                            </Box>
                            <Box display="flex" pt={3}>
                                <Box width="100%">
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            Nome:
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontStyle: 'italic', pl: 1 }}
                                        >
                                            {rowSelection.user.firstName}{' '}
                                            {rowSelection.user.lastName}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            mt: 2,
                                        }}
                                    >
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography
                                                variant="h7"
                                                sx={{ fontWeight: 'bold' }}
                                            >
                                                Tipo:
                                            </Typography>
                                            <Typography
                                                variant="h7"
                                                sx={{
                                                    fontStyle: 'italic',
                                                    pl: 1,
                                                }}
                                            >
                                                {
                                                    rowSelection
                                                        .companyPriceTable.name
                                                }
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', pl: 10 }}>
                                            <Typography
                                                variant="h7"
                                                sx={{ fontWeight: 'bold' }}
                                            >
                                                Preço:
                                            </Typography>
                                            <Typography
                                                variant="h7"
                                                sx={{
                                                    fontStyle: 'italic',
                                                    pl: 1,
                                                }}
                                            >
                                                R$
                                                {
                                                    rowSelection
                                                        .companyPriceTable.price
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ mt: 3, display: 'flex' }}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    Inserir Valor:
                                </Typography>
                                <RealInput
                                    inputRef={valueRef}
                                    onKeyDown={handleValueKeyDown}
                                    onValueChange={handleSetValue}
                                    clearInput={clearInput}
                                    // onChange={(e) => {
                                    //     setValue(e.target.value);
                                    // }}
                                    onClear={() => setClearInput(false)}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    mt: 2,
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#B0B0B0',
                                        ml: 2,
                                        '&:hover': {
                                            backgroundColor: '#D06400',
                                            boxShadow: 'none',
                                        },
                                    }}
                                    onClick={() => {
                                        console.log('value cancel = ', value);
                                        if (value !== null || value !== '') {
                                            setValue('');
                                        }
                                        setShowModalAddValue(false);
                                    }}
                                >
                                    <Typography>Cancelar</Typography>
                                </Button>
                                <Button
                                    ref={saveBtnRef}
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#2EB300',
                                        ml: 2,
                                        '&:hover': {
                                            backgroundColor: '#D06400',
                                            boxShadow: 'none',
                                        },
                                    }}
                                    onClick={handleAddValue}
                                    disabled={isLoadingAddValue}
                                >
                                    <Typography>Salvar</Typography>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            ) : (
                <></>
            )}

            {/* EDIT CLIENT MODAL */}
            {isLoadingSelection === false ? (
                <Modal
                    open={showModalEditClient}
                    onClose={() => setShowModalEditClient(false)}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                    }}
                >
                    <Box sx={style}>
                        <Box
                            sx={{
                                width: '100%',
                                textAlign: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        justifyContent: 'center',
                                        color: '#434343',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Editar Cliente
                                </Typography>
                            </Box>
                            <Box display="flex" pt={3}>
                                <Box width="100%">
                                    <Box sx={{ display: 'flex' }}>
                                        <TextField
                                            variant="standard"
                                            label="Primeiro Nome"
                                            defaultValue={
                                                rowSelection.user.firstName
                                            }
                                            sx={{ flex: 1 }}
                                        />
                                        <TextField
                                            variant="standard"
                                            label="Último Nome"
                                            defaultValue={
                                                rowSelection.user.lastName
                                            }
                                            sx={{ ml: 5, flex: 1 }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            mt: 2,
                                        }}
                                    >
                                        <Box sx={{ display: 'flex' }}>
                                            <NativeSelect
                                                onChange={(event) => {
                                                    const typeId =
                                                        event.target.value;

                                                    setSelectedType(
                                                        priceTables.find(
                                                            (k) =>
                                                                k.companyPriceTableId ===
                                                                parseInt(typeId)
                                                        ) ?? null
                                                    );
                                                    // setPrice(
                                                    //     selectedType.price
                                                    // );
                                                }}
                                            >
                                                <option key={0} value={0}>
                                                    Selecionar tipo...
                                                </option>
                                                {priceTables.map(
                                                    (priceTable) => (
                                                        <option
                                                            key={
                                                                priceTable.companyPriceTableId
                                                            }
                                                            value={
                                                                priceTable.companyPriceTableId
                                                            }
                                                        >
                                                            {priceTable.name}
                                                        </option>
                                                    )
                                                )}
                                            </NativeSelect>

                                            <Typography
                                                sx={{
                                                    pl: 2,
                                                    fontStyle: 'italic',
                                                    pt: 1,
                                                }}
                                            >
                                                Preço: R${' '}
                                                {selectedType
                                                    ? selectedType.price
                                                    : '--'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ mt: 3, display: 'flex' }}></Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    mt: 2,
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#B0B0B0',
                                        ml: 2,
                                        '&:hover': {
                                            backgroundColor: '#D06400',
                                            boxShadow: 'none',
                                        },
                                    }}
                                    onClick={() => {
                                        console.log('value cancel = ', value);
                                        if (value !== null || value !== '') {
                                            setValue('');
                                        }
                                        setShowModalAddValue(false);
                                    }}
                                >
                                    <Typography>Cancelar</Typography>
                                </Button>
                                <Button
                                    ref={linkBtnRef}
                                    disabled={isLoadingLinkCard}
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#D06400',
                                        ml: 2,
                                        '&:hover': {
                                            backgroundColor: '#D06400',
                                            boxShadow: 'none',
                                        },
                                    }}
                                    onClick={handleLinkCard}
                                >
                                    <Typography>Vincular crachá</Typography>
                                </Button>
                                <Button
                                    ref={saveBtnRef}
                                    disabled={isLoadingEditClient}
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#2EB300',
                                        ml: 2,
                                        '&:hover': {
                                            backgroundColor: '#D06400',
                                            boxShadow: 'none',
                                        },
                                    }}
                                    onClick={handleUpdateClient}
                                >
                                    <Typography>Salvar</Typography>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            ) : (
                <></>
            )}
        </Box>
    );
};
export default ClientsScreen;
