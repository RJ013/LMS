require('dotenv').config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticRouter from "./routes/analytics.route";
import {ErrorMiddleware} from "./middleware/error";
import layoutRouter from "./routes/layout.route";

//body parser
app.use(express.json({limit: "50mb"}));

//cookie parser
app.use(cookieParser());

//cors
app.use(cors({
    origin: process.env.ORIGIN,  // This will be the string 'http://localhost:3000'
    credentials: true  // If your API requires credentials (cookies or authentication)
  }));
  

// routes
app.use("/api/v1",userRouter);
app.use("/api/v1",courseRouter);
app.use("/api/v1",orderRouter);
app.use("/api/v1",notificationRouter);
app.use("/api/v1",analyticRouter);
app.use("/api/v1",layoutRouter);




// testing api
app.get("/test",(req:Request, res:Response, next:NextFunction)=>{
    res.status(200).json({
        success:true,
        message:"API is working",
    });
});


//unknown route
app.all("*",(req:Request, res:Response, next:NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.status = 404;
    next(err);
});

app.use(ErrorMiddleware);