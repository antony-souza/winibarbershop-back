import jwt from 'jsonwebtoken';
import { IUser } from '../schema/userSchema';
import { User } from '../schema/userSchema';
import dotenv from 'dotenv';

dotenv.config();

export function tokenCreate(user: IUser): string {
    const secret = process.env.SECRET;

    const token = jwt.sign({
        _userId: user._id,
    }, secret, { expiresIn: '1h' });

    return token;
}

export async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token de autorização não fornecido.' });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.SECRET); // Corrigido aqui
        const userId = decoded._userId; // Corrigido aqui

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: 'Usuário associado ao token não encontrado.' });
        }

        // Adiciona o token autenticado ao objeto de solicitação para uso posterior
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.error('Erro ao autenticar o token JWT:', error);
        return res.status(403).json({ message: 'Falha na autenticação do token JWT.' });
    }
}
