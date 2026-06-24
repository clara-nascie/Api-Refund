import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";
import { compare } from "bcrypt";
import { authConfig } from "@/configs/auth";
import { sign } from "jsonwebtoken";


// Cria a sessão do usuario
class SessionController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email({message: "E-mail inválido"}),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(req.body);

    // aqui entra o prisma pra buscar na base de dados
    // Se o usuario nao existir, retorna erro
    // Se o usuario existir, retorna o usuario
    // Se a senha estiver errada, retorna erro

    const user = await prisma.user.findFirst({where: {email}});

    if(!user){
        throw new AppError("Email ou senha invalidos.", 401);
    }
    
    // Compara a senha
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
        throw new AppError("Email ou senha invalidos.", 401);
    }

    //estamos gerando o token para autenticar o usuario
    const {secret, expiresIn} = authConfig.jwt;

    //criamos o token e passamos a regra do usuario e o id como subject 
    const token = sign({role: user.role}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    // Se tudo estiver certo, retorna o usuario
     res.json({token, user});
    }
}

export { SessionController };