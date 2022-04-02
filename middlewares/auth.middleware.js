const jwt = require('jsonwebtoken')

const authorization = ( req, res, next) =>{
    const bearer = req.get('Authorization')

    if(!bearer) return res.status(401).json({msg: 'Request without token'})
        const tokenWithoutBearer = bearer.split(' ')[1]

    try{
        const decodedToken = jwt.verify(tokenWithoutBearer, process.env.SECRET_JWT)
        req.user = { ...decodedToken }
        next();  
        }catch(error){
         res.status(401).json({msg: 'Unauthorized', error: error.message});
    }}
    
module.exports = authorization;