import express from "express";
import { activateUser, getAllUsers, getUserInfo, loginUser, logoutUser, registerationUser, socialAuth, updateAccessToken, updatepassword, updateProfilePicture, updateUserInfo, updateUserRole } from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
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

userRouter.get("/get-all-users",isAuthenticated,authorizeRoles("admin"),getAllUsers);

userRouter.put("/get-user",isAuthenticated,authorizeRoles("admin"),updateUserRole);

export default userRouter;  