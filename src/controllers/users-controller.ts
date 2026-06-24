import {Request, Response} from "express";
import { z } from "zod"
import {UserRole} from "@prisma/client"

// Validação de dados usando o zod 
class UsersController{
    async create(req: Request, res: Response){

        const bodySchema = z.object({
        name:z
            .string()
            .trim()
            .min(3, "Nome é obrigatório"),
        email:z
            .string()
            .email({message:"Email inválido"})
            .toLowerCase(),
        password:z
            .string()
            .min(6, "Senha deve ter pelo menos 6 caracteres"),
        role:z
            .enum([UserRole.employee, UserRole.manager])
            .default(UserRole.employee)
        })

        // Extrai os dados do corpo da requisição
        const {name, email, password, role} = bodySchema.parse(req.body);

        res.json({
            name,
            email,
            password,
            role
        })
        
    }
}

export {UsersController}