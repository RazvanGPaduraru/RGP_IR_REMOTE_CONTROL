import { Remote } from "../../Models/Remote";
import api from "../api";

class RemotesService{
    private readonly BASE_URL: string = 'https://localhost:7259/api/Remotes';
    getAllRemotes = () : Promise<Remote[]> => {
        return new Promise((resolve, reject) => {
            api.get(`${this.BASE_URL}/GetAllRemotes`).then(resp => resolve(resp.data))
                .catch((error) => reject(error));
        });
    }
    upsertRemote = (remote: Remote) : Promise<Remote> => {
        return new Promise((resolve, reject) => {
            api.post(`${this.BASE_URL}/UpsertRemote`, remote).then(resp => resolve(resp.data))
                .catch((error) => reject(error));
        });
    }
}