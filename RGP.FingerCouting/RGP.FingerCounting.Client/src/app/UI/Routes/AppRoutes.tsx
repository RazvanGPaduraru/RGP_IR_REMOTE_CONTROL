import React, { useState } from 'react';

import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import Home from '../Areas/Dashboard/Home';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import {DashboardStackParamsList} from "../../Screens/DashboardStackParamsList"
import DetailsScreen from '../Areas/Dashboard/Details';
import { Linking } from 'react-native';
import { useAuth } from '../../Contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { DrawerContent } from '../Areas/Dashboard/DrawerContent';
import { Support } from '../Areas/Dashboard/Support';
import { Settings } from '../Areas/Dashboard/Settings';


export type dashboardScreenProp = StackNavigationProp<DashboardStackParamsList, 'Home'>;


const Drawer = createDrawerNavigator<DashboardStackParamsList>();

interface CustomDrawerContentProps {
    signOut : () => void
}



const AppRoutes = () => {
    const {signOut} = useAuth();
    const navigation = useNavigation<dashboardScreenProp>();
    const [loading, setLoading] = useState(false);
    const handleSignOut = async () =>{
        try{
          setLoading(true)
          await signOut();
        }catch(err){
          console.log(err);
  
        }finally{
          setLoading(false)
        }
        
      }
    return(
        <>
            <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent/>}>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Details" component={DetailsScreen} />
                <Drawer.Screen name="Support" component={Support}/>
                <Drawer.Screen name="Settings" component={Settings}/>
            </Drawer.Navigator>
        
            </>

    )
}


export default AppRoutes;