import { Router } from "express";
import {usersRoutes} from "./users-routes";

const routes = Router();

//rotas públicas sem authenticação
routes.use("/users",usersRoutes);

export {routes}