const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = res.header('auth-token')
    if(!token) return res.status(401).send('Access Denied!')

    try {
        const verifyToken = jwt.verify(token, procss.env.token_secret)
        req.user = verified
        next()
    } catch(err) {
        res.status(400).send('Invalid Token!')
    }
}