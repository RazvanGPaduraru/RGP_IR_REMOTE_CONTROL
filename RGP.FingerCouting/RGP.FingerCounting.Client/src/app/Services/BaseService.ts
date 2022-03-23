export class BaseService {
    protected handleError(error: any, reject: (err?: any) => void) {
        if (error.response.data) {
            const messages = error.response.data.Messages as any[];
            var errorMessage = "";
            for (const m of messages) {
                errorMessage += m.Message + "\n";
            }
            console.log(errorMessage);
            reject(new Error(errorMessage));
        } else {
            console.log(error)
            reject(new Error("Something went wrong. Please consult server log"));
        }
    }
}
