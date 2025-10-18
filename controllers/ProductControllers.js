import express from "express"
import { getDbConnection } from "../db/db.js"

export async function getMovements(req,res) {

    try{
        const db = await getDbConnection()

    const rows = await db.all('SELECT DISTINCT movement FROM products ')
    const movement = rows.map(row => row.movement)
    //console.log(movement)

    res.json(movement)
    }
    catch(err){
        res.status(500).json({error: 'Failed to fetch genres', details: err.message})
    }
    
}

export async function getProducts(req,res) {

    try{
            const db = await getDbConnection()

            let query = 'SELECT * FROM products'

            let params = []

            const { movement , search} = req.query

            if(movement){
                query += ' WHERE movement = ?'
                params.push(movement)
            }
            else if(search){
                query += ' WHERE artist LIKE ? OR title LIKE ? OR movement LIKE ?'
                const searchParam = `%${search}%`
                params.push(searchParam,searchParam,searchParam)
            }

            const products = await db.all(query,params)
            //console.log("req.query:", req.query)

            res.json(products)
    }
    catch(err){
        res.status(500).json({error: 'Failed to fetch products', details: err.message})
    }
    
}