import mongoose, { Schema, model } from "mongoose";

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    newPassword:String;
    newPasswordConfirm:String;
}

const userSchema = new Schema<IUser>({
    name:     { type: String, required: true },
    email:    { type: String, required: true },
    password: { type: String, required: true },
    newPassword:{type:String, required:true},
    newPasswordConfirm:{type:String, require: true}
});

export const User = model<IUser>('User', userSchema);

