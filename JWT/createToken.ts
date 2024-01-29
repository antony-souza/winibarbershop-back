import jwt from 'jsonwebtoken';
import { IUser } from '../schema/userSchema';

export function createToken(user: IUser): string{
    const secreat = process.env.JWT_SEC;

    const token = jwt.sign({
        name: user.name,
        email: user.email,
        password: user.password,
        id: user._id
    }, secreat);

    return token;
}
