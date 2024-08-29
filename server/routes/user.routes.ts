import express from "express";
import { activateUser, getUserInfo, loginUser, logoutUser, registerationUser, socialAuth, updateAccessToken, updatepassword, updateProfilePicture, updateUserInfo } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";
const userRouter  = express.Router();

userRouter.post('/registration',registerationUser);

userRouter.post('/activate-user',activateUser);

userRouter.post('/login',loginUser);

userRouter.get('/logout',isAuthenticated,logoutUser);

userRouter.get("/refresh",updateAccessToken);

userRouter.get("/me",isAuthenticated,getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-user-info",isAuthenticated, updateUserInfo);

userRouter.put("/update-user-password",isAuthenticated, updatepassword);

userRouter.put("/update-user-avatar",isAuthenticated, updateProfilePicture);

export default userRouter;  