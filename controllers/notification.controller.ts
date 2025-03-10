import notificationModel from "../models/notificationModel";
import { Request,Response,NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";

//get all notifications -- only admmin

export const getNotifications = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const notifications = await notificationModel.find().sort({createdAt:-1});

        res.status(201).json({
            success:true,
            notifications,
        });
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})

//update notification status -- only admin
export const updateNotification = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const notification =await notificationModel.findById(req.params.id);
        if(!notification){
            return next(new ErrorHandler("Notification not found",400));
        }else{
            notification.status
            ?(notification.status="read")
            :notification?.status;
        }
        await notification.save();

        const notifications = await notificationModel.find().sort({
            createdAt:-1,
        });

        res.status(201).json({
            success:true,
            notifications,
        });
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})

// delete notification -- only admin
var cron = require('node-cron');
cron.schedule("0 0 0 * * *", async()=>{
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await notificationModel.deleteMany({status:"read",createdAt:{$lt:thirtyDaysAgo}});
    console.log("Deleted read notifications");
})