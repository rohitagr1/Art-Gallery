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

export async function getAll(req, res) {
  if (!req.session.userID) {
    return res.json({ error: 'Not Logged in' })
  }

  const db = await getDbConnection()

  const items = await db.all(`
    SELECT 
      ci.id AS cartItemId,
      ci.quantity,
      p.id AS productId,
      p.title,
      p.artist,
      p.image,
      p.price
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ?
  `, [req.session.userID])

    // convert price to number
  items.forEach(item => item.price = parseFloat(item.price))

  //console.log(' Cart items for user', req.session.userID, ':', items)
  res.json({ items })
}

export async function deleteItem(req,res){

  const db = await getDbConnection()

  const itemId = parseInt(req.params.itemId,10)

  if(isNaN(itemId)){
    return res.status(400).json({error: " Invalid Item Id"})
  }

  const item = await db.get('SELECT quantity FROM cart_items WHERE id = ? AND user_id = ?',
    [itemId , req.session.userID])

  if(!item){
    return res.status(400).json({error: " Item Not Found"})
  }

  await db.run('DELETE FROM cart_items WHERE id = ? AND user_id = ?',
    [itemId , req.session.userID])

  res.status(204).send()

}

export async function deleteAll(req,res){

  const db = await getDbConnection();

  await db.run('DELETE FROM cart_items WHERE user_id = ?', [req.session.userID]);

  res.status(204).send();

}