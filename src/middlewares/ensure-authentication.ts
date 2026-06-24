import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";

//interface para tipar o token
interface TokenPayload {
    role: string
    sub: string
}

function ensureAuthentication(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    try {
        if (!authHeader) {
            throw new AppError('JWT token not found', 401);
        }

        //aqui eu separo o header authorization em type e token
        const [type, token] = authHeader.split(' ');

        if (type !== 'Bearer' || !token) {
            throw new AppError('JWT token is malformed', 401);
        }

        //verify = verify a assinatura do token e retorna o payload
        const {role, sub: user_id} = verify(token, authConfig.jwt.secret) as TokenPayload;

        //reconhece o user por causa do express.d.ts, entao posso acessar req.user
        //e tipar ele como um objeto com id e role
        req.user = {
            id: user_id,
            role
        }

        return next();

    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError('Invalid token', 401);
    }

}

export { ensureAuthentication }
