import { Request, Response } from "express";
import { Schedules } from "../../schema/userSchema";

export async function showSchedule(req:Request,res:Response) {
    try{
        const showSchedule = await Schedules.find()

        res.status(200).json({msg:'Lista de agendamentos:',showSchedule})
        
    }catch(error){
        res.status(404).json({msg:'Schedules not found!'})
    }
}