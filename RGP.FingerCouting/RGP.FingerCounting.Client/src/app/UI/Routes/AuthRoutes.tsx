import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../Areas/SignIn/SignIn';
import SignUp from '../Areas/SignIn/SignUp';
import SplashScreen from '../Areas/SignIn/SplashScreen';
import RemotesView from '../Areas/Dashboard/RemotesView';
import Home from '../Areas/Dashboard/Home';


const AuthStack  = createStackNavigator();



const AuthRoutes = () => {
    
    return(
        <AuthStack.Navigator screenOptions={{headerShown:false}}>
            <AuthStack.Screen name="SplashScreen" component={SplashScreen}/>
            <AuthStack.Screen name="SignIn" component={SignIn}/>
            <AuthStack.Screen name="SignUp" component={SignUp} />
        </AuthStack.Navigator>

    )
}


export default AuthRoutes;