import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Constants } from "../Constants/Constants";
import { User } from "../Models/User";


const api = axios.create({
    baseURL: Constants.BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
});
api.interceptors.request.use(
    
    async(config) => {
      var token = await AsyncStorage.getItem('@reactNativeAuth:token');
      if(token){
        config.headers = {
          'Authorization': `Bearer ${token}`,
        }
      }
    return config;
    },
    (error) => {
        return Promise.reject(error);
    }
  )


api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/api/Authenticate/Login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          // Refresh Token
          var user: User | null = await AsyncStorage.getItem('@reactNativeAuth:user') as any;
          const rs = await api.post("/api/Authenticate/RefreshToken", {
            refreshToken: user?.refreshToken,
            accessToken: user?.token
          });
          const { accessToken, refreshToken } = rs.data;
          if(user){
            user.token = accessToken;
            user.refreshToken = refreshToken;
            await AsyncStorage.setItem('@reactNativeAuth:user', JSON.stringify(user));
            originalConfig.headers = {
              'Authorization': `Bearer ${accessToken}`,
            }
          }
          return api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default api;