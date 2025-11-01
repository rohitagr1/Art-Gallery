import express from "express";
import { addtocart, getCartCount } from "../controllers/cartControllers.js";

export const cartRouter = express.Router()

cartRouter.post('/add',addtocart)
cartRouter.get('/cart-count',getCartCount)

