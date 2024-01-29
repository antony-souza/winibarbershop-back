import { Request,Response } from 'express'
import { User } from "../../schema/userSchema";

export async function showItens(req:Request, res:Response) {
    try{
        const itens = await User.find()
        res.status(200).json({itens})
    }catch(err){
        res.status(404).json({msg:'Itens not found!'})
    }
}