import express from "express";
import { authorizeRoles,isAuthenticated } from "../middleware/auth";

import { updateAccessToken } from "../controllers/user.controller";
import { createLayout } from "../controllers/layout.controller";
const layoutRouter = express.Router();
layoutRouter.post("/create-layout",updateAccessToken,isAuthenticated,authorizeRoles("admin"),createLayout);
export default layoutRouter;