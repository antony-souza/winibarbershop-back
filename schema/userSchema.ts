import mongoose, { Schema, Types, model } from "mongoose";

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
    agendamentos: Types.ObjectId[]
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true},
    code: { type: String},
    codeExpiration: { type: Date},
    newPassword: { type: String},
    newPasswordConfirm: { type: String},
    isAdmin: { type: Boolean, default: false },
    agendamentos: [{ type: Schema.Types.ObjectId, ref: 'Agendamento' }] // Referência aos IDs dos agendamentos
});

export const User = model<IUser>('User', userSchema);
