import { Request, Response } from 'express';
import { User } from "../../schema/userSchema";

export async function showUser(req: Request, res: Response) {
    try {
 
        const filters = req.query;

        const projection = {
            _id:1,
            name: 1,
            email: 1,
            date:1,
            isAdmin:1
        };

    
        const users = await User.find(filters, projection);
        const clientList = users.map(item => ({
            id:item._id,
            name:item.name,
            email:item.email,
            isAdmin:item.isAdmin
        }))

        res.status(200).json({ clientList });
    } catch (err) {
        res.status(404).json({ msg: 'Itens não encontrados!' });
    }
}
