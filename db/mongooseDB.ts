import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

export async function DataBase(){
    
    try{
      
        await mongoose.connect(process.env.MONGO as string);

        console.log('MongoDB connected!')

    }catch(err){
        console.error('Error to connect:',err)
    }
}
