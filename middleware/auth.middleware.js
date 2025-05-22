import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication required', token: authHeader })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Token not found' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        console.error('JWT Error:', err)
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};