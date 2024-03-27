import { Request, Response } from 'express';
import { Schedules } from '../../schema/userSchema';

export async function deleteSchedules(req: Request, res: Response) {
    const { id } = req.params;

    try {

        const schedule = await Schedules.findById(id);

        if (!schedule) {
            return res.status(404).json({ msg: 'Agendamento não encontrado' });
        }

        await schedule.deleteOne();

        res.status(200).json({ msg: 'Agendamento excluído com sucesso' });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro ao excluir agendamento' });
    }
}
