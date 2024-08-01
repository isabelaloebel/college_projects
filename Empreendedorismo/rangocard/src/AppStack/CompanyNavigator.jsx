import React, { useState } from 'react';
import {
    Routes,
    Route,
    useParams,
    useNavigate,
    Navigate,
} from 'react-router-dom';
import { Box } from '@mui/system';
import HomeScreen from './HomeScreen';
import MenuSidebar from '../Components/MenuSidebar';
import { CssBaseline } from '@mui/material';
import BalanceScreen from './BalanceScreen';
import ClientsScreen from './ClientsScreen';
import DashboardScreen from './DashboardScreen';
import EmployeesScreen from './EmployeesScreen';
import PricesScreen from './PricesScreen';
import TransactionsScreen from './TransactionsScreen';

const CompanyNavigator = ({ onLogout }) => {
    const { companyId } = useParams();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    console.log('COMPANYNAVIGATOR', companyId);

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            <MenuSidebar
                onChangeRoute={(r) => navigate(r)}
                onLogout={() => {
                    onLogout();
                    navigate('/login');
                }}
            ></MenuSidebar>
            <Box
                sx={{
                    flexGrow: 1,
                    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/imgs/bg.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <main className="content">
                    <Routes>
                        <Route path="*" element={<Navigate to="" />} />
                        <Route path="" element={<HomeScreen />} />
                        {/* <Route path="add-value" element={<BalanceScreen />} /> */}
                        <Route path="prices" element={<PricesScreen />} />
                        <Route
                            path="transactions"
                            element={<TransactionsScreen />}
                        />
                        <Route path="clients" element={<ClientsScreen />} />
                        <Route path="employees" element={<EmployeesScreen />} />
                        <Route path="dashboard" element={<DashboardScreen />} />
                    </Routes>
                </main>
            </Box>
        </Box>
    );
};
export default CompanyNavigator;
