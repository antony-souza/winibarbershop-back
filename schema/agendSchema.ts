import mongoose from "mongoose";

const Schema = mongoose.Schema;

const agendSchema = new Schema({
    dataTime:{
        type:Date,
        require:true
    }
})

export const schedulingModel = mongoose.model('agend', agendSchema)