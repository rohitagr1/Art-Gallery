import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';
import { art } from './data.js';

async function seedTable(){
    const db = await open({
        filename: path.join('database.db'),
        driver: sqlite3.Database
    }) 

    try {
        await db.exec('BEGIN TRANSACTION')

        for( const {title, artist, price, movement, image_filename, yearCreation} of art){
            await db.run(`INSERT INTO products (title,artist,image,price,year,movement) values(?,?,?,?,?,?)`,
                 [title, artist, image_filename,price, yearCreation, movement])
        }

        await db.exec(`COMMIT`)
        console.log(`seeding done`)
    }
    catch(err){
        await db.exec('ROLLBACK')
        console.error('Error inserting data:', err.message)
    }
    finally{
        await db.close()
        console.log('Database connection closed.')
    }
}

seedTable();