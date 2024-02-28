import { Request, Response } from "express";
import { AgendamentoJoão, AgendamentoWinicius } from "../../schema/agendamentoSchema";

export async function Agendar(req:Request, res:Response) {
        
        const { dataHour, barbeiro } = req.body;
        const { cliente } = req.params;

        try {
            const novoAgendamentoWinicius = new AgendamentoWinicius({
                cliente: cliente,
                barbeiro: barbeiro,
                dataHour: dataHour,
            });

            const novoAgendamentoJoao = new AgendamentoJoão({
                cliente: cliente,
                barbeiro: barbeiro,
                dataHour: dataHour,
            });

            const agendamentoSalvoWinicius = await novoAgendamentoWinicius.save();
            const agendamentoSalvoJoao = await novoAgendamentoJoao.save();

            res.status(201).json({
                agendamentoWinicius: agendamentoSalvoWinicius, 
                agendamentoJoao: agendamentoSalvoJoao
            });
        } catch (error) {
            console.error("Erro ao criar agendamento:", error);
            res.status(500).json({ error: "Erro ao criar agendamento" });
        }
}
