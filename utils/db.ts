import mongoose from 'mongoose';
require('dotenv').config();

const dbUrl:string = process.env.DB_URL || "";

const connectDB = async () =>{
    try {
        await mongoose.connect(dbUrl).then((data:any)=>{
            console.log(`Databse connected eith ${data.connection.host}`)
        })
    }catch(error){
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;