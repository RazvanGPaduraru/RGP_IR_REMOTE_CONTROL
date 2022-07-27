import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../Services/auth/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Alert } from 'react-native';
import api from '../Services/api';
import { User } from '../Models/User';

interface AuthContextData {
    signed: boolean;
    user: User | null;
    signIn(username: string, password: string): Promise<void>;
    signOut(): void;
  }
  
  const AuthContext = createContext<AuthContextData>({} as AuthContextData);
  
  export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<User | null>();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      const loadStorageData = async () =>{
        const storageUser = await AsyncStorage.getItem('@reactNativeAuth:user');
        const storageToken = await AsyncStorage.getItem('@reactNativeAuth:token');
        const tokenExpirationDate:any = await AsyncStorage.getItem('@reactNativeAuth:tokenExpirationDate');


        

        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (storageUser && storageToken && new Date().toLocaleString() < new Date(tokenExpirationDate).toLocaleString()) {
          setUser(JSON.parse(storageUser));
          
        }
        setLoading(false);
      }
      loadStorageData();
    }, [])


    const signIn = async (username: string, password: string) =>{


      try{
        const response = await AuthService.signIn(username, password);
        let user = {
          name: response.name,
          email: response.email,
          token: response.token,
          refreshToken: response.refreshToken,
          expiration: response.expiration,
        }

        setUser(user);
        
        api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

        await AsyncStorage.setItem(
          '@reactNativeAuth:user',
          JSON.stringify(user),
        );

        await AsyncStorage.setItem(
          '@reactNativeAuth:tokenExpirationDate',
          JSON.stringify(user.expiration),
        );

        await AsyncStorage.setItem('@reactNativeAuth:token', response.token);

      }catch(err : any){
        throw JSON.stringify(err);
      }
      
    }

    const signOut = async () =>{
      await AsyncStorage.clear().then(() => {
        setUser(null);
      });
    }

    if (loading) {
      return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#666" />
          </View>
      )
    }
  
    return (
      <AuthContext.Provider value={{signed: !!user, user: user as any, signIn, signOut}}>
        {children}
      </AuthContext.Provider>
    );
  };


export const useAuth = () =>{
  const context = useContext(AuthContext);
  return context;
}

export default AuthContext;