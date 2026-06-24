import { Request, Response } from "express";
import { prisma } from "@/database/prisma";

class RefundsController {
    async create(req: Request, res: Response){
        res.json({message: "Reembolsos"});
    }
}

export { RefundsController };
