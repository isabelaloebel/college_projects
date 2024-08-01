import {
    Box,
    Typography,
    Button,
    TextField,
    CssBaseline,
    FormControl,
    InputLabel,
    NativeSelect,
} from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// import logo from '../../public/assets/imgs/logo.png';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { API } from '../App';

const CompaniesScreen = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        API.api('GET', '/me/companies', {}, (status, response) => {
            if (status === 200) {
                API.companies = response.results;
                console.log('api.companies = ', API.companies);
                setCompanies(response.results);
                setIsLoading(false);
            } else {
                alert(response.message);
            }
        });
    }, []);

    if (isLoading) {
        return <></>;
    }

    return (
        <Box
            position="absolute"
            display="flex"
            flexDirection="column"
            height="100vh"
            alignItems="center"
            justifyContent="center"
            sx={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/imgs/bg.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <CssBaseline />

            <Box textAlign="center">
                <img
                    alt="logo."
                    src={process.env.PUBLIC_URL + '/assets/imgs/logo.png'}
                    width={'15%'}
                />
            </Box>

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                    >
                        Empresa
                    </InputLabel>
                    <NativeSelect
                        onChange={(event) => {
                            console.log(event);
                            const companyId = event.target.value;

                            setSelectedCompany(
                                companies.find(
                                    (k) => k.companyId === parseInt(companyId)
                                ) ?? null
                            );
                        }}
                    >
                        <option key={0} value={0}>
                            Selecionar empresa...
                        </option>
                        {companies.map((company) => (
                            <option
                                key={company.companyId}
                                value={company.companyId}
                            >
                                {company.name}
                            </option>
                        ))}
                    </NativeSelect>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            width: '100%',
                            backgroundColor: '#FF7A00',
                            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
                        }}
                        disabled={selectedCompany === null}
                        onClick={() => {
                            console.log(selectedCompany);
                            navigate(`/company/${selectedCompany.companyId}/`);
                        }}
                    >
                        Selecionar
                    </Button>
                </FormControl>
            </Box>
        </Box>
    );
};
export default CompaniesScreen;
