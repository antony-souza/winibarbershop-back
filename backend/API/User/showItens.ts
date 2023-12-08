import { Request,Response } from 'express'
import { UserSchema } from "../../schema/userSchema";

export async function ListItens(req:Request, res:Response) {
    try{
        const itens = await UserSchema.find()
        res.status(200).json({itens})


    }catch(err){

        res.status(404).json({msg:'Itens not found!'})

    }
}