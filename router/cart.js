import express from 'express'
import { 
  addtoCart, getCartCount, getAll, deleteItem, deleteAll } from '../controllers/cartControllers.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const cartRouter = express.Router()

cartRouter.post('/add', requireAuth, addtoCart) 
cartRouter.get('/cart-count', requireAuth, getCartCount)
cartRouter.get('/', requireAuth, getAll) 
cartRouter.delete('/all', requireAuth, deleteAll) 
cartRouter.delete('/:itemId', requireAuth, deleteItem) 