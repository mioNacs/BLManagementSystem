import mongoose from "mongoose";
import { dbName } from "../constant.js";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
      const connectionInstance =   await mongoose.connect(`${process.env.DATABASE_URL}/${dbName}`);
        console.log(
            `\n mongo db connection DB host ${connectionInstance.connection.host}`
          );
    } catch (error) {   
        console.error("Database connection failed", error);
        throw error;
        
    }
}



export { connectDB };