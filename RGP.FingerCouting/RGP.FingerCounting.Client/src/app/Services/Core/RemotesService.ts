import { Constants } from "../../Constants/Constants";
import { Remote } from "../../Models/Remote";
import api from "../api";


class RemotesService{
    private readonly BASE_URL: string = Constants.BASE_URL + '/Remotes';
    getAllRemotes = () : Promise<Remote[]> => {
        return new Promise((resolve, reject) => {
            api.get(`${this.BASE_URL}/GetAllRemotes`).then(resp => resolve(resp.data))
                .catch((error) => reject(error));
        });
    }
    insertRemote = (remote: Remote) : Promise<Remote> => {
        return new Promise((resolve, reject) => {
            api.post(`${this.BASE_URL}/CreateRemote`, remote).then(resp => resolve(resp.data))
                .catch((error) => reject(error));
        });
    }
    updateRemote = (remote: Remote) : Promise<Remote> => {
        return new Promise((resolve, reject) => {
            api.put(`${this.BASE_URL}/UpdateRemote`, remote).then(resp => resolve(resp.data))
                .catch((error) => reject(error));
        });
    }
    deleteRemote = (remoteId: string) : Promise<Remote> => {
        return new Promise((resolve, reject) => {
            api.delete(`${this.BASE_URL}/DeleteRemote/${remoteId}`).then(resp => resolve(resp.data))
                .catch((error) => reject(error));
        });
    }
    
}

export default new RemotesService();