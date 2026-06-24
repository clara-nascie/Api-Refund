import { Router } from "express";
import {UsersController} from "../controllers/users-controller";

//configuração das rotas de usuários
const usersRoutes = Router();
const userController = new UsersController();

//rota de criação de usuário
usersRoutes.post("/",userController.create)

export {usersRoutes}