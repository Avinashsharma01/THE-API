import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied!' });

    try {
        const verified = jwt.verify(token, 'soumya');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token!' });
    }
};

export default authMiddleware;
