import { authenticateToken } from "../../middleware/authenticateToken";
import { Schedules } from "../../schema/userSchema";

export async function Schedule(req, res) {
    // Verifica o token e extrai o ID e nome do usuário
    authenticateToken(req, res, async () => {
        const { id } = req.user; // ID e nome do usuário autenticado

        const {client, dateHour, employee } = req.body;

        try {
            // Cria o agendamento associado ao cliente logado
            const newSchedule = new Schedules({
                userId: id, // ID do usuário
                client: client, // Nome do usuário
                employee: employee,
                dateHour: dateHour,
            });

            const saveSchedule = await newSchedule.save();

            res.status(201).json({
                Schedule: saveSchedule,
            });
        } catch (error) {
            console.error("Erro ao criar agendamento:", error);
            res.status(500).json({ error: "Erro ao criar agendamento" });
        }
    });
}
