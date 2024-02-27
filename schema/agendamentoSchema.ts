import { Model, Schema, model } from "mongoose"

export interface IAgend {
    dataHour: string,
    barbeiro: string
};

const barberSchema = new Schema<IAgend>({
    dataHour: {type: String},
    barbeiro: {type: String}
});

export const Barber = model<IAgend>('Barber', barberSchema)