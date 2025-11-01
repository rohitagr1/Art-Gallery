import express from 'express'
import { productsRouter } from './router/products.js'
import { authRouter } from './router/auth.js'
import { meRouter } from './router/me.js'
import { cartRouter } from './router/cart.js'
import session from 'express-session'

const app = express()


const PORT = 8000
const secret = process.env.SPIRAL_SESSION_SECRET || 'ROHIT_AGARWAL'

app.use(express.json())

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}))

app.use(express.static('public'))

app.use('/api/products', productsRouter)
app.use('/api/auth/me',meRouter)
app.use('/api/auth',authRouter)
app.use('/api/cart',cartRouter)

app.listen(PORT , ()=> {
    console.log(`server connected on PORT ${PORT}`)
}).on('error', (err) => {
  console.error('Failed to start server:', err)
}) 