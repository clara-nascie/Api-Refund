import { Router } from "express";
import {usersRoutes} from "./users-routes";
import {sessionsRoutes} from "./sessions-routes";
import {refundsRoutes} from "./refunds-routes";

import { ensureAuthentication } from "@/middlewares/ensure-authentication";

const routes = Router();

//rotas públicas sem authenticação
routes.use("/users",usersRoutes);
routes.use("/sessions",sessionsRoutes);

//rotas privadas com authenticação
routes.use(ensureAuthentication);
routes.use("/refunds",refundsRoutes);

export {routes}