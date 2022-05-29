import axios from "axios";
import { Constants } from "../../Constants/Constants";
import { BaseService } from "../BaseService";

interface Response {
    token: string;
    email: string,
    name:string,
    refreshToken:string,
    expiration: Date


    
}

class AuthService{


  //https://192.168.100.2:45455/
  //http://cd2a-2a02-a58-84af-6200-4991-7dec-f334-7335.ngrok.io
  private readonly BASE_URL: string = Constants.BASE_URL + '/Authenticate';
  
  signIn = (userName:string, password:string) : Promise<Response> => {

    return new Promise((resolve, reject) => {
      axios.post(`${this.BASE_URL}/Login`, {
        username : userName,
        password : password
      }, { headers : {"Access-Control-Allow-Origin": "*"}}).then(resp => resolve(resp.data))
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

