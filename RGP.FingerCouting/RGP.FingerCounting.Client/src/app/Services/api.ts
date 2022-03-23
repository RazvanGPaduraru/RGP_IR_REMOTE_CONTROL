import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const api = axios.create({
    baseURL: 'http://127.0.0.1:7259/api/',
});
api.interceptors.request.use(
    
    async(config) => {
      var token = await AsyncStorage.getItem('@reactNativeAuth:token');
      config.headers = {
        'Authorization': `Bearer ${token}`,
    }
    return config;
    },
    function (error) {
        return Promise.reject(error);
    }
  )
export default api;