import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

async function clearDB() {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  })
  await db.exec('DELETE FROM users WHERE id = 2;')
  console.log('🧹 Cleared users table')
  await db.close()
}

clearDB()
