import axios from "axios";
import { BaseService } from "../BaseService";

interface Response {
    token: string;
    email: string,
    name:string,
    refreshToken:string,
    expiration: Date


    
}

class AuthService{

  private readonly BASE_URL: string = 'https://localhost:7259/api/Authenticate';
  
  signIn = (userName:string, password:string) : Promise<Response> => {

    return new Promise((resolve, reject) => {
      axios.post(`${this.BASE_URL}/Login`, {
        username : userName,
        password : password
      }).then(resp => resolve(resp.data))
        .catch((error) => reject(error));

    })
  }

  signUp = (userName:string, password:string, email: string) : Promise<Response> => {

    return new Promise((resolve, reject) => {
      axios.post(`${this.BASE_URL}/Register`, {
        username : userName,
        password : password,
        email: email
      }).then(resp => {console.log("aaaaaaaaa");resolve(resp.data)})
        .catch((error) => reject(error));

    })
  }
}

export default new AuthService();

