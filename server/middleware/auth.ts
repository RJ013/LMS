import { Request,Response,NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import  jwt  from "jsonwebtoken";
import {redis} from '../utils/redis'
//authenticated user 
export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
        return next(new ErrorHandler("Please login to access this resource", 400));
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload | string;

    if ( !decoded._id) {
        return next(new ErrorHandler("Access token is not valid", 400));
    }

    const user = await redis.get(decoded.id as string);

    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }

    req.user = JSON.parse(user);
    next();
})