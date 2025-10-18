import express from 'express'
import {getMovements , getProducts} from '../controllers/ProductControllers.js'

export const productsRouter = express.Router();

productsRouter.get('/movement',getMovements)
productsRouter.get('/',getProducts)
