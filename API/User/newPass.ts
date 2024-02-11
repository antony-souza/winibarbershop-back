import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { IUser, User } from '../../schema/userSchema';
import { Resend } from 'resend';

async function checkCode(user:IUser, req,res, next) {
    
}

export async function newPass(req: Request, res: Response) {
    const { id } = req.params;
    const { newPassword, newPasswordConfirm } = req.body;

    try {
       
        const user = await User.findOne({ _id: id});

        
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        
        if (newPassword !== newPasswordConfirm) {
            return res.status(400).json({ message: 'As senhas não são iguais! Por favor, confira a senha.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashPassword;
        const UpdateUser = await User.findByIdAndUpdate(id, newPassword,newPasswordConfirm)

        const resend = new Resend(process.env.TOKEN_RESEND);
        const { data, error } = await resend.emails.send({
            from: "Barbershop <onboarding@resend.dev>",
            to: [user.email],
            subject: "Nova Senha 🔐",
            html: `<h2>Senha alterada com sucesso! Sua nova senha:</h2>
            <h3>${newPassword}</h3>
            <h3>Não compartilhe com ninguém!</h3>`
        });

        if (error) {
            return res.status(400).json({ error });
        }

        return res.status(200).json({success:true, message: 'Senha do usuário atualizada com sucesso.', user, data });
        
    } catch (error) {
        console.error('Erro ao atualizar a senha do usuário:', error);
        return res.status(500).json({ success:false, message: 'Erro ao atualizar a senha do usuário!' });
    }
}
