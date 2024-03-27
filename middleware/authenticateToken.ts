import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ msg: 'Falha na autenticação do token' });
        }
        req.user = user;
        next();
    });
}
