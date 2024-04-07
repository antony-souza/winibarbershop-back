import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '../../schema/userSchema';

dotenv.config();

export function tokenCreate(user: IUser): string {
    const secret = process.env.SECRETT;

    const token = jwt.sign(
        {
            _userId: user._id
            
        },
        secret,
    );

    return token;
}
