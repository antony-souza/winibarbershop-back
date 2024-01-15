import { userModel } from "../../schema/userSchema";
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

export async function CheckLogin(req: Request, res: Response, next: NextFunction) {
    
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }

        const existingUser = await userModel.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({ msg: 'Invalid email or password' });
        }

        // Comparar a senha fornecida com o hash no banco de dados
        const passwordHash = await bcrypt.compare(password, existingUser.password);

        if (!passwordHash) {
            return res.status(401).json({ msg: 'Invalid email or password' });
        }

        res.status(200).json({success:true,msg:'Deu bom fml :)'})
        next();

    } catch (error) {
        console.error('Error in CheckLogin:', error);
        return res.status(500).json({success:false, msg: 'Internal Server Error' });
    }
}
