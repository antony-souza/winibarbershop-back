import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../schema/userSchema';
import { Resend } from 'resend';

export async function newPass(req: Request, res: Response) {
    const { newPassword, newPasswordConfirm } = req.body;
    const {code} = req.headers

    try {
        // !== verifica se são diferentes
        if (newPassword !== newPasswordConfirm) {
            return res.status(400).json({ message: 'As senhas não são iguais! Por favor, confira a senha.' });
        }

        
        const user = await User.findOne({code});

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Gera o hash da nova senha
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        // Atualiza a senha do usuário
        user.password = hashPassword;
        const updatedUser = await user.save();

        // Envio de email para notificar sobre a mudança de senha
        const resend = new Resend(process.env.TOKEN_RESEND);
        const { data, error } = await resend.emails.send({
            from: "Barbershop <onboarding@resend.dev>",
            to: ['antonygustavo10202016@gmail.com'],
            subject: "Nova Senha 🔐",
            html: `<h2>Senha alterada com sucesso! Sua nova senha:</h2>
            <h3>${newPassword}</h3>
            <h3>Não compartilhe com ninguém!</h3>`
        });

        if (error) {
            return res.status(400).json({ error });
        }

        return res.status(200).json({ success: true, message: 'Senha do usuário atualizada com sucesso.', user: updatedUser, data });
        
    } catch (error) {
        console.error('Erro ao atualizar a senha do usuário:', error);
        return res.status(500).json({ success: false, message: 'Erro ao atualizar a senha do usuário!' });
    }
}
