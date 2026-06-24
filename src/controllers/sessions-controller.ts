import { Request, Response } from "express";
import { z } from "zod";

// Cria a sessão do usuario
class SessionController {
  async create(req: Request, res: Response) {
    return res.json({ message: "Login realizado com sucesso" });
  }
}

export { SessionController };