import { Request, Response } from "express";
import { z } from "zod";

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
    


    // Se tudo estiver certo, retorna o usuario
     res.json({email, password});
    }
}

export { SessionController };