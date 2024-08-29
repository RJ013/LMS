import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from '../utils/redis';

// Authenticated user middleware
export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
        return next(new ErrorHandler("Please login to access this resource", 400));
    }

    // Assuming the JWT payload contains an `id` field for the user
    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;

    // Check if `decoded` is an object and has the `id` property
    if (typeof decoded !== "object" || !decoded.id) {
        return next(new ErrorHandler("Access token is not valid", 400));
    }

    const user = await redis.get(decoded.id as string);

    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }

    req.user = JSON.parse(user);
    next();
});


//validate user function


export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user?.role || '';

        if (!roles.includes(userRole)) {
            return next(new ErrorHandler(`Role: ${userRole} is not allowed to access this resource`, 403));
        }

        next();
    };
};
