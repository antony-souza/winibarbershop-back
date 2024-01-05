import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userModel } from '../../schema/userSchema';

export async function routerJWT (req:Request, res:Response, next:NextFunction){
    const id = req.params.id;

    const user = await userModel.findById(id, '-password')

    if(!user){

     return res.status(404).json({msg:"User Not Found!"})
    }

    res.status(200).json({user})
}

function verifyToken (req:Request, res:Response, next:NextFunction){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({msg:'Acess denid!'})
    }
    try{
        const secreat = process.env.SECREAT
        jwt.verify(token,secreat)    
        next()
    }catch(err){
        res.status(400).json({msg:'Token invalid'})
    }
}