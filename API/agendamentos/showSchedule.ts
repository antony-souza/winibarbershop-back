import { Request, Response } from 'express';
import { Schedules } from "../../schema/userSchema";

export async function showSchedule(req: Request, res: Response) {
    try {
        const filters = req.query;

        const projection = {
            _id: 1,
            client: 1,
            employee: 1,
            dateHour: 1,
            haircut: 1
        };

        const schedule = await Schedules.find(filters, projection);

        const scheduleList = schedule.map(item => ({
            id: item._id,
            client: item.client,
            employee: item.employee,
            dateHour: item.dateHour,
            haircut: item.haircut
        }));

        res.status(200).json({ scheduleList });
    } catch (err) {
        res.status(404).json({ msg: 'Agendamentos não encontrados!' });
    }
}
