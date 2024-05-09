import { authenticateToken } from "../../middleware/authenticateToken";
import { Schedules } from "../../schema/userSchema";
import moment from 'moment'; // 

export async function Schedule(req, res) {
    // Verifica o token e extrai o ID e nome do usuário
    authenticateToken(req, res, async () => {
        const { id } = req.user; 

        const { client, dateHour, employee,haircut } = req.body;

        try {
            
            const adjustedDateHour = moment(dateHour).subtract(3, 'hours');

            const newSchedule = new Schedules({
                userId: id,
                client: client,
                employee: employee,
                dateHour: adjustedDateHour,
                haircut: haircut
            });

            const saveSchedule = await newSchedule.save();

            res.status(201).json({ Schedule: saveSchedule });

        } catch (error) {
            console.error("Erro ao criar agendamento:", error);
            res.status(500).json({ error: "Erro ao criar agendamento" });
        }
    });
}
