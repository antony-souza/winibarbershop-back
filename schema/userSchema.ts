import { Db } from "mongodb";
import mongoose, { Schema, model } from "mongoose";

// Definição do esquema para usuário
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

// Definição do esquema para agendamento
export interface ISchedule {
    userId: string | mongoose.Types.ObjectId, // Referência ao ID do usuário
    client: string,
    employee: string,
    dateHour: Date
};

// Esquema do usuário
const userSchema = new Schema<IUser>({
    name: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true},
    code: { type: String},
    codeExpiration: { type: Date},
    newPassword: { type: String},
    newPasswordConfirm: { type: String},
    isAdmin: { type: Boolean, default: false },
});

// Esquema do agendamento
const ScheduleSchema = new Schema<ISchedule>({
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    client:{type: String, require: true},
    employee: { type: String, required: true },
    dateHour: { type: Date, required: true }
});

// Modelo do usuário
export const User = model<IUser>('User', userSchema);

// Modelo do agendamento
export const Schedules = model<ISchedule>('Schedule', ScheduleSchema);
