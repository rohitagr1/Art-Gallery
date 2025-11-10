export function requireAuth(req, res, next){

    if(!req.session.userID){

        console.log("Access to protected Route Blocked")
        return res.status(401).json({error:"Unauthorised"})

    }

    next()

}