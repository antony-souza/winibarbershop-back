import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
});

export const UserScema = mongoose.model('user', userSchema)