import { Schema, model, Types } from "mongoose";
import { IUser } from "./userSchema";

export interface IAgendamento {
    cliente: Types.ObjectId | IUser, // Referência ao ID do cliente associado ao agendamento
    barbeiro: string,
    dataHour: Date,
};

const agendamentoSchema = new Schema<IAgendamento>({
    cliente: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // O campo cliente é uma referência ao ID do usuário
    barbeiro: { type: String, required: true },
    dataHour: { type: Date, required: true }
});

export const AgendamentoWinicius = model<IAgendamento>('AgendamentoWinicius', agendamentoSchema);
export const AgendamentoJoao = model<IAgendamento>('AgendamentoJoao', agendamentoSchema);
