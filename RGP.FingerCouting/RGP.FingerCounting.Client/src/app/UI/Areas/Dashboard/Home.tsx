import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import {Button, View, StyleSheet, TouchableOpacity} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import AuthContext, { useAuth } from '../../../Contexts/AuthContext';
import { DashboardStackParamsList } from '../../../Screens/DashboardStackParamsList';

type dashboardScreenProp = StackNavigationProp<DashboardStackParamsList, 'Home'>;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
  });
  
  const Dashboard = () => {
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
  
    return (
      <div>
          
        <Button title='Details'

            onPress={() =>
              navigation.navigate('Details')}
            />  
          
          <Button title="Sign Out" onPress={handleSignOut} />

      </div>
          
      
    );
  };
  
  export default Dashboard;