import { Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { hash } from "bcrypt";

import { z } from "zod";

// Validação de dados usando o zod
class UsersController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(3, "Nome é obrigatório"),
      email: z.string().email({ message: "Email inválido" }).toLowerCase(),
      password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
      role: z.nativeEnum(UserRole).default(UserRole.employee),
    });

    // Extrai os dados do corpo da requisição
    const { name, email, password, role } = bodySchema.parse(req.body);

    // verifica se o usuario ja existe
    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    // Se o usuario já existir, retorna erro
    if (userWithSameEmail) {
      throw new AppError("Email já cadastrado");
    }

    // Hashing da senha
    const hashedPassword = await hash(password as string, 8);

    //se passou por todas as validações, cria o usuario
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      }
    })

    res.status(201).send("Usuario criado com sucesso");
  }
}

export { UsersController };
