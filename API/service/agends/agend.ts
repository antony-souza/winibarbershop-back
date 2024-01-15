import { Request, Response, NextFunction } from 'express';
import { agendModel } from '../../../schema/agendSchema';

export async function dateCalender(req:Request,res:Response){
    try{
        const {dataTime} = req.body;
        
        const newAgend = new agendModel({
            dataTime
        })
        
        const result = await newAgend.save()
        res.status(201).json({msg:'Agendamento',succsess:true,agendModel:result})

    }catch(error){
        console.error('Erro ao criar agendamento:', error);
        res.status(500).json({ success: false, msg: 'Erro interno do servidor' });
    }
}