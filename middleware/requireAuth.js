export function requireAuth(req, res, next) {

  if (!req.session.userID) {

    console.log('Access to protected route blocked')
    return res.status(401).json({ error: 'Unauthorized' })

  }

  next()
}