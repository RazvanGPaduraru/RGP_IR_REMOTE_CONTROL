import { Button } from "react-native";
import { Constants } from "../../Constants/Constants";
import { AppButton } from "../../Models/AppButton";
import api from "../api";

class ButtonService{
    private readonly BASE_URL: string = Constants.BASE_URL + '/Buttons';
    getAllButtons = (remoteId:string) : Promise<AppButton[]> => {
        return new Promise((resolve, reject) => {
            api.get(`${this.BASE_URL}/GetAllButtons/${remoteId}`).then(resp => resolve(resp.data))
                .catch((error) => reject(error));
        });
    }
    insertButton = (button: AppButton) : Promise<AppButton> => {
        return new Promise((resolve, reject) => {
            api.post(`${this.BASE_URL}/CreateButton`, button).then(resp => resolve(resp.data))
                .catch((error) => reject(error));
        });
    }
    updateButton = (button: AppButton) : Promise<AppButton> => {
        return new Promise((resolve, reject) => {
            api.put(`${this.BASE_URL}/UpdateButton`, button).then(resp => resolve(resp.data))
                .catch((error) => reject(error));
        });
    }
    deleteButton = (buttonId: AppButton) : Promise<AppButton> => {
        return new Promise((resolve, reject) => {
            api.delete(`${this.BASE_URL}/DeleteButton/${buttonId}`).then(resp => resolve(resp.data))
                .catch((error) => reject(error));
        });
    }
    pressButton  = (buttonId: string) : Promise<string> => {
        return new Promise((resolve, reject) => {
            api.get(`${this.BASE_URL}/PressButton/${buttonId}`).then(resp => resolve(resp.data))
                .catch((error) => reject(error));
        });
    }
    
}

export default new ButtonService();