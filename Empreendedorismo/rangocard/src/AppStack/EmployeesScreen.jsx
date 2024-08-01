import {
    Box,
    Button,
    Dialog,
    IconButton,
    InputAdornment,
    InputBase,
    Modal,
    Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { API } from '../App';
import Header from '../Components/Header';

import CircularProgress from '@mui/material/CircularProgress';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const EmployeesScreen = () => {
    const { companyId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSelection, setIsLoadingSelection] = useState(true);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isLoadingPost, setIsLoadingPost] = useState(false);
    const [isLoadingResponse, setIsLoadingResponse] = useState(true);
    const [isLoadingDeleteDialog, setIsLoadingDeleteDialog] = useState(true);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [showModalNewEmployee, setShowModalNewEmployee] = useState(false);

    const [roles, setRoles] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [rowSelection, setRowSelection] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);

    const searchAllRef = useRef(null);
    const saveBtnRef = useRef(null);

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
            renderCell: (params) => {
                return (
                    params.row.user.firstName + ' ' + params.row.user.lastName
                );
            },
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 1,
            renderCell: (params) => {
                if (params.row.role === 'EMPLOYEE') return 'Funcionário';
                else return params.row.role;
            },
        },
        {
            field: 'companyRoleId',
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
                        {/* DELETE EMPLOYEE ICONBUTTON */}
                        <IconButton
                            onClick={() => {
                                console.log('params.row =', params.row);
                                setRowSelection(params.row);
                                setIsLoadingSelection(false);
                                setOpenDeleteDialog(true);
                                setIsLoadingDeleteDialog(false);
                            }}
                        >
                            <DeleteRoundedIcon sx={{ color: '#D06400' }} />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];

    useEffect(() => {
        (async function () {
            try {
                //falta ver essa chamada da api
                API.api(
                    'GET',
                    `/company/${companyId}/roles`,
                    {},
                    (status, response) => {
                        if (status === 200) {
                            console.log(response.results);
                            setEmployees(response.results);
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
            <Header title={'Gerenciar Funcionários'} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <InputBase
                    sx={{
                        width: '80%',
                        pl: 2,
                        borderRadius: 5,
                        border: 1,
                        borderColor: '#B0B0B0',
                        backgroundColor: '#F4F4F4',
                    }}
                    placeholder="Buscar por CPF ou e-mail."
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton color="#434343" sx={{ p: 1 }}>
                                <SearchOutlinedIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    onChange={(e) => {
                        //falta verificar essa chamada
                        API.api(
                            'GET',
                            `/company/${companyId}/roles`,
                            { q: e.target.value },
                            (status, response) => {
                                if (status === 200) {
                                    setEmployees(response.results);
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
                            setShowModalNewEmployee(true);
                        }}
                    >
                        <AddOutlinedIcon />
                        <Typography pl={1}>Vincular Funcionário</Typography>
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
                            rows={employees}
                            columns={columns}
                            pagination={true}
                            autoPageSize={true}
                            getRowId={(row) => row.companyRoleId.toString()}
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
                        {/* DELETE EMPLOYEE DIALOG */}
                        {isLoadingDeleteDialog === false ? (
                            <Dialog
                                open={openDeleteDialog}
                                onClose={() => setOpenDeleteDialog(false)}
                            >
                                <Box sx={{ px: 3, py: 2 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
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
                                            {rowSelection.user.firstName}{' '}
                                            {rowSelection.user.lastName}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography fontWeight="bold">
                                            Role:
                                        </Typography>
                                        <Typography pl={1} fontStyle="italic">
                                            {rowSelection.role}
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
                                                    'DELETE',
                                                    `/company/${companyId}/role/${rowSelection.companyRoleId}`,
                                                    {},
                                                    (status, response) => {
                                                        if (status === 200) {
                                                            console.log(
                                                                response
                                                            );
                                                            toast.success(
                                                                `Funcionário excluído com sucesso!`,
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
                                                                `Erro ao excluir funcionário.`,
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
                        ) : (
                            <></>
                        )}
                    </Box>
                )}
            </Box>

            {/* ADD NEW EMPLOYEE MODAL falta chamada da api */}
            {isLoadingSelection === false ? (
                <Modal
                    open={showModalNewEmployee}
                    onClose={() => setShowModalNewEmployee(false)}
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
                                    Vincular Funcionário
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
                                        console.log(event);
                                        //falta mudar a chamada p certa
                                        let str = event.target.value;
                                        console.log(
                                            'searchAllRef.current.value',
                                            event.target.value
                                        );
                                        API.api(
                                            'GET',
                                            `/user/identify/${str}`,
                                            {},
                                            (status, response) => {
                                                if (status === 200) {
                                                    console.log(
                                                        'busca = ',
                                                        response
                                                    );
                                                    setSelectedUser(response);
                                                    setIsLoadingResponse(false);
                                                } else {
                                                    // alert(response.message);
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
                            {isLoadingResponse === false ? (
                                <Box mt={2}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
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
                                </Box>
                            ) : (
                                <></>
                            )}

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
                                        setShowModalNewEmployee(false);
                                    }}
                                >
                                    <Typography>Cancelar</Typography>
                                </Button>

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
                                            `/company/${companyId}/role`,
                                            {
                                                user_id: selectedUser.userId,
                                                role: 'EMPLOYEE',
                                            },
                                            (status, response) => {
                                                setIsLoading(false);

                                                if (status === 200) {
                                                    // console.log(response);
                                                    toast.success(
                                                        `Usuário vinculado com sucesso!.`,
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
                                                    setShowModalNewEmployee(
                                                        false
                                                    );
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
            ) : (
                <></>
            )}
        </Box>
    );
};
export default EmployeesScreen;
