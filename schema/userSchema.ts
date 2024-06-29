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

export interface ISchedule {
    userId: string | mongoose.Types.ObjectId,
    client: string,
    employee: string,
    dateHour: Date,
    haircut: string
};

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

const ScheduleSchema = new Schema<ISchedule>({
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    client:{type: String, require: true},
    employee: { type: String, required: true },
    dateHour: { type: Date, required: true },
    haircut: {type: String}
});

export const User = model<IUser>('User', userSchema);
export const Schedules = model<ISchedule>('Schedule', ScheduleSchema);
