import { Router } from "express";
import { createEvent , getALLEvents } from "../controllers/event.controller.js";

const eventRouter = Router();

eventRouter.post("/createEvent", createEvent);
eventRouter.get("/getALLEvents", getALLEvents);


export default eventRouter;