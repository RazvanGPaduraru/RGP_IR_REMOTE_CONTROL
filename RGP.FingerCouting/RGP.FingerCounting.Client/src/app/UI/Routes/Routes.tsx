import React, { useContext } from 'react';
import AuthContext, { useAuth } from '../../Contexts/AuthContext';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';



const Routes = () => {
    const {signed} = useAuth();
    
    return signed ?  <AppRoutes /> : <AuthRoutes />;
}

export default Routes;