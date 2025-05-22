import jwt from 'jsonwebtoken'

export const isAdmin = async(req, res, next) => {
    const token = () => {
        return jwt.verify(req.headers.authorization?.split(' ')[1], process.env.JWT_SECRET)
    }
    
    if(await token().role !== 'admin') {
        return res.status(401).json({ error: 'Admin required'})
    }
    next()
}