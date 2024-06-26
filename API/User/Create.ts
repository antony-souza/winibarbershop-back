import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../schema/userSchema';  

export function ValidationUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;


    if(!name){
        res.status(404).json({msg:'The name is require'})
    }

    if(!email){
        res.status(404).json({msg:'The email is require'})
    }

    if(!password){
        res.status(404).json({msg:'The passowrd is require'})
    }
    next()
}

export async function CheckUser(req: Request, res: Response, next: NextFunction){
    const {email} = req.body;
    
    const emailFind = await User.findOne({email:email})

    if(emailFind){
        return res.status(420).json({msg: 'User exist'});
    }
    next()
}

export async function CreateUser(req: Request, res: Response){
    const {name, email, password, isAdmin} = req.body;

    const salt = await bcrypt.genSalt(15)
    const passHash = await bcrypt.hash(password, salt)
    const user = new User({name, email, password:passHash, isAdmin})

    try{
    
        await user.save();

        res.status(201).json({msg: 'User create successfully!'});

    }catch(err){
        console.error(err)
    }
}