import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../Services/auth/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Alert } from 'react-native';
import api from '../Services/api';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn(username: string, password: string): Promise<void>;
    signOut(): void;
  }
  
  const AuthContext = createContext<AuthContextData>({} as AuthContextData);
  
  export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      const loadStorageData = async () =>{
        const storageUser = await AsyncStorage.getItem('@reactNativeAuth:user');
        const storageToken = await AsyncStorage.getItem('@reactNativeAuth:token');
        

        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (storageUser && storageToken) {
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
          user: response.name,
          email: response.email
        }

        setUser(user);
        
        api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

        await AsyncStorage.setItem(
          '@reactNativeAuth:user',
          JSON.stringify(user),
        );

        await AsyncStorage.setItem('@reactNativeAuth:token', response.token);

      }catch(err){
        throw "Wrong email or password";
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
      <AuthContext.Provider value={{signed: !!user, user: user, signIn, signOut}}>
        {children}
      </AuthContext.Provider>
    );
  };


export const useAuth = () =>{
  const context = useContext(AuthContext);
  return context;
}

export default AuthContext;