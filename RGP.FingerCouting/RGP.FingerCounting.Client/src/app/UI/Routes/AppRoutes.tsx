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


type dashboardScreenProp = StackNavigationProp<DashboardStackParamsList, 'Home'>;


const Drawer = createDrawerNavigator<DashboardStackParamsList>();

interface CustomDrawerContentProps {
    signOut : () => void
}

const CustomDrawerContent = (props : CustomDrawerContentProps) => {
    return (
        <DrawerContentScrollView {...props}>
          <DrawerItem label="Log out" onPress={() => props.signOut()} />
        </DrawerContentScrollView>
    )
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
            <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent signOut={() => handleSignOut() }/>}>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Details" component={DetailsScreen} />
            </Drawer.Navigator>
        
            </>

    )
}


export default AppRoutes;