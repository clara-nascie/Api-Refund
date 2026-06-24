import { Router } from "express";
import { RefundsController } from "@/controllers/refunds-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const refundsRoutes = Router();
const refundsController = new RefundsController();

//somente usuarios do tipo employee podem criar reembolsos
refundsRoutes.post(
    "/",
    verifyUserAuthorization(["employee"]),
    refundsController.create);

//o restante pode ver todas os reembolsos

export { refundsRoutes };