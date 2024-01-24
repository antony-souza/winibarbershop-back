import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { mongoDB } from './variableDB';

dotenv.config()

export async function DataBase(){
    
    try{
        await mongoose.connect(mongoDB);

        console.log('MongoDB connected!')

    }catch(err){
        console.error('Error to connect:',err)
    }
}
