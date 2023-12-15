import { userModel } from '../../schema/userSchema';
import { Request, Response} from 'express';

export async function userDelete(req:Request, res:Response) {
    const {id} = req.params

    try{
        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).json({msg:'User not found!'})
        }

        await user.deleteOne({_id:id})
        res.status(200).json({msg:'User delete successfully!'})

    }catch(err){
        console.error(err)
        res.status(500).json({msg:'Error delete user!'})
    }
    
}