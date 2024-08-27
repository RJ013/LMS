import { NextFunction, Request, Response } from "express"
import ErrorHadler from "../utils/ErrorHandler"

export const ErrorMiddleware = (err:any,req:Request,res:Response,next:NextFunction)=>{
    err.statusCode= err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    //wrong Monggo db id

    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid : ${err.path}`;
        err= new ErrorHadler(message,400);
    }

    //Duplicate Kew error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err= new ErrorHadler(message,400);
    }

    //wrong jwt error
    if(err.name === 'JsonWebTokenError'){
        const message = `Json web token is invalid , try again`;
        err= new ErrorHadler(message,400);
    }

    // jwt expired

    if(err.name === 'TokenExpiredError'){
        const message = `Json web token is Expired , try again`;
        err= new ErrorHadler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}