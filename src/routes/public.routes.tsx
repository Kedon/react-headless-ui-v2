import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HorizontalLayout from '../templates/authLayout/HorizontalLayout';
import { useAuth } from '../hooks/useAuth';
import Login from '../pages/login/Login';

const PublicRoutes: React.FC = () => {
    const { logged } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(logged && location.pathname === "/"){
            navigate("/products")
        } 

        if(!logged && location.pathname !== "/"){
            navigate("/")
        }
    }, [logged, location]);
    
    return (
    <HorizontalLayout>
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    </HorizontalLayout>
    );
};

export default PublicRoutes;