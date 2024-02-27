import mongoose, { Schema, model } from "mongoose";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    code: string;
    codeExpiration: Date;
    newPassword: string;
    newPasswordConfirm: string;
    isAdmin:boolean;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true},
    code: { type: String},
    codeExpiration: { type: Date},
    newPassword: { type: String},
    newPasswordConfirm: { type: String},
    isAdmin: { type: Boolean, default: false }
});

export const User = model<IUser>('User', userSchema);
