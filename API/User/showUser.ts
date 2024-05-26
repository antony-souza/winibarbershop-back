import { Request, Response } from 'express';
import { User } from "../../schema/userSchema";

export async function showUser(req: Request, res: Response) {
    try {
 
        const filters = req.query;

        const projection = {
            _id:1,
            name: 1,
            email: 1,
            isAdmin:1
        };

        const users = await User.find(filters, projection);

        res.status(200).json({ users });
    } catch (err) {
        res.status(404).json({ msg: 'Itens não encontrados!' });
    }
}
