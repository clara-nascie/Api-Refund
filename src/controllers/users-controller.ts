import {Request, Response} from "express";
import { prisma } from "../database/prisma";

class UsersController{
    async create(req: Request, res: Response){
        res.json({
            message:"ok"
        })
        
    }
}

export {UsersController}