//errores contaplados del lado del servidor 

class ServerError extends Error {
    constructor(message, status, code = null) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

export default ServerError;
