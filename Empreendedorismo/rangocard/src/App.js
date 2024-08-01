import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './Login/LoginScreen';

import CompaniesScreen from './Company/CompaniesScreen';
import CompanyNavigator from './AppStack/CompanyNavigator';

function APISDK() {
    let _this = this;
    this.BASEURL =
        // 'https://386f-2804-2610-6752-ee00-884a-b7a2-f4-f2f9.ngrok-free.app/api/v1';
        // this.BASEURL = 'http://192.168.3.61:9091/api/v1';
        this.BASEURL = 'http://192.168.137.1:9091/api/v1';
    this.userId = null;
    this.authorization = null;
    this.me = null;
    this.company = null;
    this.companies = null;

    this.init = (userId, authorization) => {
        _this.userId = userId;
        _this.authorization = authorization;
    };

    this.api = async (method, route, params, callback, abortController) => {
        const headers = {
            Accept: 'application/json',
        };

        if (method === 'GET' || method === 'DELETE')
            route = `${route}?${new URLSearchParams(params).toString()}`;
        else if (method === 'POST' || method === 'PUT') {
            headers['Content-Type'] = 'application/json; charset=UTF-8';
            params = JSON.stringify(params);
        }
        console.log(
            'API CALLED, METHOD',
            method,
            'route',
            route,
            'host',
            _this.BASEURL
        );

        if (_this.authorization !== null)
            headers['Authorization'] = _this.authorization;

        if (_this.userId !== null) headers['User-Id'] = _this.userId;

        const response = await fetch(`${_this.BASEURL}${route}`, {
            signal: abortController?.signal,
            method: method,
            headers: headers,
            body: method === 'POST' || method === 'PUT' ? params : undefined,
        })
            .then((response) => {
                const statusCode = response.status;
                const data = response.json();
                return Promise.all([statusCode, data]);
            })
            .then(([status, data]) => {
                callback?.(status, data);
            })
            .catch((error) => {
                console.log(error);

                if (abortController?.signal.aborted === true)
                    callback?.(-1, { message: 'aborted' });
                else callback?.(0, { message: 'network error' });
            });
    };
}
export var API = new APISDK();

// Authentication state for demonstration
const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return {
        isAuthenticated,
        login: () => setIsAuthenticated(true),
        logout: () => setIsAuthenticated(false),
    };
};

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const auth = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            API.init(userId, token);
            API.api('GET', '/me', {}, (status, response) => {
                if (status === 200) {
                    API.me = response;
                    auth.login();
                } else {
                    alert(response.message);
                }

                setIsLoading(false);
            });
        } else {
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            setIsLoading(false);
        }
    }, []);

    if (isLoading) return <></>;

    return (
        <BrowserRouter>
            {auth.isAuthenticated ? (
                <Routes>
                    <Route path="*" element={<Navigate to="/companies" />} />
                    <Route path="/companies" element={<CompaniesScreen />} />
                    <Route
                        path="/company/:companyId/*"
                        element={
                            <CompanyNavigator
                                onLogout={() => {
                                    localStorage.removeItem('userId');
                                    localStorage.removeItem('token');
                                    auth.logout();
                                }}
                            />
                        }
                    />
                </Routes>
            ) : (
                <Routes>
                    <Route path="*" element={<Navigate to="/login" />} />
                    <Route
                        path="/login"
                        element={
                            <LoginScreen
                                onLogin={() => {
                                    auth.login();
                                }}
                            />
                        }
                    />
                </Routes>
            )}
        </BrowserRouter>
    );
};

export default App;
