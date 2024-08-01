import {
    Box,
    Button,
    Dialog,
    IconButton,
    InputAdornment,
    InputBase,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { API } from '../App';
import Header from '../Components/Header';
import RealInput from '../Components/RealInput';

import CircularProgress from '@mui/material/CircularProgress';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const PricesScreen = () => {
    const { companyId } = useParams();

    const [clearInput, setClearInput] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSelection, setIsLoadingSelection] = useState(true);
    const [isLoadingPost, setIsLoadingPost] = useState(false);
    const [isLoadingPut, setIsLoadingPut] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [showModalNewPrice, setShowModalNewPrice] = useState(false);
    const [showModalEditPriceTable, setShowModalEditPriceTable] =
        useState(false);

    const [rowSelection, setRowSelection] = useState([]);
    const [prices, setPrices] = useState([]);

    const [value, setValue] = useState('');
    const [name, setName] = useState('');

    const nameRef = useRef(null);
    const valueRef = useRef(null);
    const saveBtnRef = useRef(null);

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

    const columns = [
        {
            field: 'name',
            headerName: 'Tipo',
            flex: 1,
        },
        {
            field: 'price',
            headerName: 'Preço',
            flex: 1,
        },
        {
            field: 'companyPriceTableId',
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

            renderCell: (params) => {
                return (
                    <Box>
                        {/* EDIT PRICE TABLE ICONBUTTON */}
                        <IconButton
                            onClick={() => {
                                console.log('params.row =', params.row);
                                setRowSelection(params.row);
                                setValue(params.price);
                                setIsLoadingSelection(false);
                                setShowModalEditPriceTable(true);
                            }}
                        >
                            <BorderColorRoundedIcon sx={{ color: '#D06400' }} />
                        </IconButton>

                        {/* DELETE PRICETABLE ICONBUTTON */}
                        <IconButton
                            onClick={() => {
                                console.log('params.row =', params.row);
                                setRowSelection(params.row);
                                setIsLoadingSelection(false);
                                setOpenDeleteDialog(true); //nao sera modal, sera um dialog, trocar
                            }}
                        >
                            <DeleteRoundedIcon sx={{ color: '#D06400' }} />
                        </IconButton>
                    </Box>
                );
            },
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

    const handlePostTable = async (e) => {
        let v = value.replace('.', '');
        v = v.replace(',', '.');
        setIsLoading(true);
        setIsLoadingPost(true);
        e.preventDefault();
        API.api(
            'POST',
            `/company/${companyId}/price-table`,
            { name: name, price: v },
            (status, response) => {
                setIsLoading(false);

                if (status === 200) {
                    console.log(response);
                    toast.success(
                        `Nova tabela de preço ${response.name} com o valor de R$${response.price} inserida com sucesso!`,
                        {
                            className: 'toast-success-custom',
                            style: {
                                backgroundColor: 'green',
                                color: 'white',
                            },
                        }
                    );
                    setIsLoadingPost(false);
                    setShowModalNewPrice(false);
                } else {
                    toast.error(`Erro ao inserir nova tabela de preço.`, {
                        className: 'toast-error-custom',
                        style: {
                            backgroundColor: 'red',
                            color: 'white',
                        },
                    });
                    setIsLoadingPost(false);
                }
            }
        );
    };

    useEffect(() => {
        (async function () {
            try {
                API.api(
                    'GET',
                    `/company/${companyId}/price-tables`,
                    {},
                    (status, response) => {
                        if (status === 200) {
                            setPrices(response.results);
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
            <Header title={'Tabela de Preços'} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <InputBase
                    sx={{
                        width: '85%',
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
                            `/company/${companyId}/price-tables`,
                            { q: e.target.value },
                            (status, response) => {
                                if (status === 200) {
                                    setPrices(response.results);
                                    setIsLoading(false);
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
                            setShowModalNewPrice(true);
                        }}
                    >
                        <AddOutlinedIcon />
                        <Typography pl={1}>Nova tabela</Typography>
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
                            rows={prices}
                            columns={columns}
                            pagination={true}
                            autoPageSize={true}
                            getRowId={(row) =>
                                row.companyPriceTableId.toString()
                            }
                            sx={{
                                border: 'none',
                                backgroundColor: '#EEEEEE',
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
                            autoClose={2000}
                            newestOnTop={true}
                            rtl={false}
                        />
                        {/* DELETE PRICE TABLE DIALOG */}
                        <Dialog
                            open={openDeleteDialog}
                            onClose={() => setOpenDeleteDialog(false)}
                        >
                            <Box sx={{ px: 3, py: 2 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Excluir
                                    </Typography>
                                    <Typography pt={1}>
                                        Tem certeza que deseja excluir este
                                        registro?
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', mt: 1 }}>
                                    <Typography fontWeight="bold">
                                        Nome:
                                    </Typography>
                                    <Typography pl={1} fontStyle="italic">
                                        {rowSelection.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography fontWeight="bold">
                                        Preço:
                                    </Typography>
                                    <Typography pl={1} fontStyle="italic">
                                        R${rowSelection.price}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        mt: 2,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        disabled={isLoadingDelete}
                                        sx={{
                                            backgroundColor: '#a83432',
                                            ml: 2,
                                            '&:hover': {
                                                backgroundColor: '#D06400',
                                                boxShadow: 'none',
                                            },
                                        }}
                                        onClick={() => {
                                            setIsLoadingDelete(true);
                                            API.api(
                                                'DEL',
                                                `/company/${companyId}/price-table/${rowSelection.companyPriceTableId}`,
                                                {},
                                                (status, response) => {
                                                    if (status === 200) {
                                                        console.log(response);
                                                        toast.success(
                                                            `Tabela de preço excluída com sucesso!`,
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
                                                        setIsLoadingDelete(
                                                            false
                                                        );
                                                        setOpenDeleteDialog(
                                                            false
                                                        );
                                                    } else {
                                                        toast.error(
                                                            `Erro ao excluir tabela de preço.`,
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
                                                        setIsLoadingDelete(
                                                            false
                                                        );
                                                        setOpenDeleteDialog(
                                                            false
                                                        );
                                                    }
                                                }
                                            );
                                        }}
                                    >
                                        Excluir
                                    </Button>
                                    <Button
                                        variant="contained"
                                        autoFocus
                                        sx={{
                                            backgroundColor: '#B0B0B0',
                                            ml: 2,
                                            '&:hover': {
                                                backgroundColor: '#D06400',
                                                boxShadow: 'none',
                                            },
                                        }}
                                        onClick={() => {
                                            setOpenDeleteDialog(false);
                                        }}
                                    >
                                        Voltar
                                    </Button>
                                </Box>
                            </Box>
                        </Dialog>
                    </Box>
                )}
            </Box>

            {/* ADD NEW PRICETABLE MODAL */}
            <Modal
                open={showModalNewPrice}
                onClose={() => setShowModalNewPrice(false)}
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
                                Inserir nova tabela de preço
                            </Typography>
                        </Box>
                        <Box>
                            <TextField
                                inputRef={nameRef}
                                variant="standard"
                                label="Nome"
                                sx={{ width: '100%' }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        valueRef.current.focus();
                                    }
                                }}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                mt: 2,
                            }}
                        >
                            <Typography pt={1}>Preço:</Typography>
                            <RealInput
                                inputRef={valueRef}
                                onKeyDown={handleValueKeyDown}
                                onValueChange={handleSetValue}
                                clearInput={clearInput}
                                onClear={() => setClearInput(false)}
                            />
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
                                    setShowModalNewPrice(false);
                                }}
                            >
                                <Typography>Cancelar</Typography>
                            </Button>

                            <Button
                                ref={saveBtnRef}
                                variant="contained"
                                disabled={isLoadingPost}
                                sx={{
                                    backgroundColor: '#2EB300',
                                    ml: 2,
                                    '&:hover': {
                                        backgroundColor: '#D06400',
                                        boxShadow: 'none',
                                    },
                                }}
                                onClick={handlePostTable}
                            >
                                <Typography>Salvar</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            {/* EDIT PRICETABLE MODAL */}
            {isLoadingSelection === false ? (
                <Modal
                    open={showModalEditPriceTable}
                    onClose={() => setShowModalEditPriceTable(false)}
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
                                    Editar tabela de preço
                                </Typography>
                            </Box>
                            <Box display="flex" pt={3}>
                                <Box width="100%">
                                    <Box sx={{ display: 'flex' }}>
                                        <TextField
                                            inputRef={nameRef}
                                            variant="standard"
                                            label="Nome"
                                            defaultValue={rowSelection.name}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter')
                                                    saveBtnRef.current.focus();
                                            }}
                                            onChange={(event) => {
                                                console.log(
                                                    'event.target.value = ',
                                                    event.target.value
                                                );
                                                setName(event.target.value);
                                            }}
                                            sx={{ flex: 1 }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <TextField
                                            variant="standard"
                                            label="Preço"
                                            inputRef={valueRef}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter')
                                                    saveBtnRef.current.focus();
                                            }}
                                            defaultValue={rowSelection.price}
                                            onChange={(event) => {
                                                console.log(
                                                    'event.target.value = ',
                                                    event.target.value
                                                );
                                                setValue(event.target.value);
                                            }}
                                            sx={{
                                                mt: 2,
                                                display: 'flex',
                                            }}
                                        />
                                        <Typography
                                            fontSize={12}
                                            sx={{
                                                textAlign: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            Obs: O valor a ser digitado deve ser
                                            separado por ponto e sem os
                                            caractéres 'R$', ex: 20.00 ou 20
                                        </Typography>
                                    </Box>
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
                                        setShowModalEditPriceTable(false);
                                    }}
                                >
                                    <Typography>Cancelar</Typography>
                                </Button>
                                <Button
                                    ref={saveBtnRef}
                                    variant="contained"
                                    disabled={isLoadingPut}
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
                                        setIsLoadingPut(true);

                                        API.api(
                                            'PUT',
                                            `/company/${companyId}/price-table/${rowSelection.companyPriceTableId}`,
                                            { name: name, price: value },
                                            (status, response) => {
                                                setIsLoading(false);

                                                if (status === 200) {
                                                    console.log(response);
                                                    toast.success(
                                                        `Tabela de preço alterada com sucesso!\n Nome : ${response.name}\n preço: R$${response.price}.`,
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
                                                    setIsLoadingPut(false);
                                                    setShowModalEditPriceTable(
                                                        false
                                                    );
                                                } else {
                                                    toast.error(
                                                        `Erro ao alterar tabela de preço.`,
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
                                                    setIsLoadingPut(false);
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
            ) : (
                <></>
            )}
        </Box>
    );
};
export default PricesScreen;
