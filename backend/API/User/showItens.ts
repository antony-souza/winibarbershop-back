import { Request,Response } from 'express'
import { userModel } from "../../schema/userSchema";

export async function showItens(req:Request, res:Response) {
    try{
        const itens = await userModel.find()
        res.status(200).json({itens})


    }catch(err){

        res.status(404).json({msg:'Itens not found!'})

    }
}