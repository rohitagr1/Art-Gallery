import { getDbConnection } from "../db/db.js";

export async function getCurrentUser(req,res){

    try{
        const db = await getDbConnection()

        if(!req.session.userID){
            return res.json({ isLoggedIn : false}) //bydefault status code is going 200
        }

        const user  = await db.get('SELECT name FROM users WHERE id = ?',[req.session.userID])
        res.json({ isLoggedIn: true , name : user.name})
        //console.log('Session data:', req.session)

    }
    catch(err){
        console.error('getCurrentUser error :', err)
        res.status(500).json({error : 'Internal server error'})
    }

}