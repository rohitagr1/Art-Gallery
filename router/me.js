import { getCurrentUser } from "../controllers/meControllers.js";
import express from "express";

export const meRouter = express.Router()

meRouter.get('/',getCurrentUser)


