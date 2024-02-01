import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../../schema/userSchema';
import { Resend } from 'resend';

export async function newPass(req: Request, res: Response) {
    const { id } = req.params;
    const { newPassword, newPasswordConfirm } = req.body;

    try {
        if (newPassword !== newPasswordConfirm) {
            return res.status(400).json({ message: 'As senhas não são iguais! Por favor, confira a senha!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        const updatedUser = await User.findByIdAndUpdate(id, { password: hashPassword }, { new: true });

        if (updatedUser) {
            const resend = new Resend(process.env.TOKEN_RESEND);
            const { data, error } = await resend.emails.send({
                from: "Barbershop <onboarding@resend.dev>",
                to: [updatedUser.email],
                subject: "Nova Senha 🔐",
                html: `<h2>Senha alterada com sucesso!Sua nova senha:</h2>
                <h3>${newPassword} style="font-size:20px;"</h3>
                <h3>Não compartilhe com ninguém!style="font-size:20px</h3>`
            });

            if (error) {
                return res.status(400).json({ error });
            }

            return res.status(200).json({ message: 'User password updated successfully', user: updatedUser, data });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user password:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
}
