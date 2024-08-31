import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import OrderMOdel from "../models/order.Models";


//create new order
export const newOrder = CatchAsyncError(async(data:any,next:NextFunction,res:Response)=>{
    const order = await OrderMOdel.create(data);
    
    res.status(201).json({
        success:true,
        order,
    })
})