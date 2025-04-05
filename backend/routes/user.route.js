
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";




 const userRouter = Router();

  userRouter.post("/register",registerUser);//this is used to register the user

 export {userRouter};//this is used to export the user router so that we can use it in other files
