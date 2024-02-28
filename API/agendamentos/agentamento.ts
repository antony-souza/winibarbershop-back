import { Request, Response } from "express";
import { AgendamentoWinicius } from "../../schema/agendamentoSchema";
import { authenticateToken } from "../../middleware/authenticateToken";

export async function Agendar(req, res) {
    // Verifica o token JWT e extrai o ID do usuário
    authenticateToken(req, res, async () => {
        const userId = req.user.id;

        const { dataHour, barbeiro } = req.body;

        try {
            // Cria o agendamento associado ao cliente logado
            const novoAgendamentoWinicius = new AgendamentoWinicius({
                cliente: userId,
                barbeiro: barbeiro,
                dataHour: dataHour,
            });

            const agendamentoSalvoWinicius = await novoAgendamentoWinicius.save();

            res.status(201).json({
                agendamentoWinicius: agendamentoSalvoWinicius,
            });
        } catch (error) {
            console.error("Erro ao criar agendamento:", error);
            res.status(500).json({ error: "Erro ao criar agendamento" });
        }
    });
}
