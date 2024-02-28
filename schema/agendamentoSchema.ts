import {Schema, model } from "mongoose"

export interface IAgendamentos {
    cliente: string,
    barbeiro: string
    dataHour: Date,
};

const barberSchema = new Schema<IAgendamentos>({
    cliente: {type: String, required: true},
    barbeiro:{type:String, required:true},
    dataHour: {type: Date ,required:true}
});

export const AgendamentoWinicius = model<IAgendamentos>('AgendamentoWinicius', barberSchema);
export const AgendamentoJoão = model<IAgendamentos>('AgendamentoJoão', barberSchema);

