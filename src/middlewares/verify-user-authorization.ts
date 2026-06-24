import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";

//essa função verifica se o usuario tem a role que ele precisa para acessar a rota
function verifyUserAuthorization(role: string []) {
    return (req: Request, res: Response, next: NextFunction) => {
        
        if (!req.user || !role.includes(req.user.role)) {
            throw new AppError("Unauthorized", 401);
        }

        return next();

    } 
}

export {verifyUserAuthorization}