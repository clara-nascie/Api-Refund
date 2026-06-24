import { AppError } from "../utils/AppError";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandling: ErrorRequestHandler = (err, req, res, next) => {
    
    // Erros customizados (da nossa aplicação)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    // Erros do Zod (validação de dados)
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: 'validation error',
            issues: err.format(),
        });
    }

    // Erros inesperados do servidor
    return res.status(500).json({
        message: 'internal error',
    });
};