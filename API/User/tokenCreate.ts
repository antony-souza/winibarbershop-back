import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '../../schema/userSchema';

dotenv.config();

export function tokenCreate(user: IUser): string {
    const secret = process.env.SECRETT;
    const token = jwt.sign(
        {
            id: user._id,
            isAdmin:user.isAdmin
        },
        secret,
        { expiresIn: '1h' }
    );

    return token;
}
