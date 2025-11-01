import { getDbConnection } from "../db/db.js";

export async function addtocart(req,res){

    const db = await getDbConnection();

    const productId = parseInt(req.body.productId, 10)
//console.log('Session in /api/cart/add:', req.session)

    if(isNaN(productId)){
        return res.status(400).json({error: 'Invalid product id'})
    }

    const userID = req.session.userID

    const existing = await db.get('SELECT * FROM cart_ITEMS WHERE user_id = ? AND product_id = ?',
        [userID,productId]
    )

    if(existing){
        await db.get('UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?',
            [existing.id]
        )
    }
    else {
        await db.get('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, 1)',
            [userID, productId]
        )
    }
    res.json({ message: 'CART UPDATED'})
}

export async function getCartCount(req,res){

    const db = await getDbConnection()

    const result = await db.get('SELECT SUM(quantity) AS totalItems FROM cart_items WHERE user_id = ?',
        [req.session.userID]
    )

    res.json({ totalItems : result.totalItems || 0})

}