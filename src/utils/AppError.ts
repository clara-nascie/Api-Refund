// Classe para lidar com erros customizados

class AppError {
    message: string;
    statusCode: number;
    constructor(message: string, statusCode: number = 400){  
        this.message = message;
        this.statusCode = statusCode;
    }
}

export { AppError }