import { Request, Response } from "express";
import { Resend } from "resend";
import { createToken } from "../JWT/createToken";
import { User } from "../schema/userSchema";


export async function sendMail(req: Request, res: Response) {
    const { email } = req.body;

    // Verifique se o email existe no banco de dados
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const resend = new Resend(process.env.TOKEN_RESEND);

    // Gere um token usando o email do usuário
    const token = createToken(email);

    // Construa o link de redefinição de senha com o token incorporado
    const resetLink = `http://localhost:8100/reset-password?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: "Barbershop <onboarding@resend.dev>",
        to: [email],
        subject: "Link - Redefinir Senha",
        html: `<p>Clique no link abaixo para redefinir sua senha:</p><p>Link:</p><a href="${resetLink}">Redefinir Senha</a>`
    });

    if (error) {
        return res.status(400).json({ error });
    }

    res.status(200).json({ data });
}


/* function generateRandomCode(length: number): string {
    const characters = '0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomCode = Math.floor(Math.random() * characters.length);
        code += characters[randomCode];
    }
    return code;
}
 */