import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createOrder, getAllorders } from "../controllers/order.controller";
const orderRouter = express.Router();


orderRouter.post("/create-order",isAuthenticated,createOrder);
orderRouter.get("/get-all-orders",isAuthenticated,authorizeRoles("admin"),getAllorders);
export default orderRouter;
