import { NextFunction, Request, Response } from "express";
import { Resend } from "resend";
import { User } from "../../schema/userSchema";

export async function sendMail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const code = generateRandomCode(8);

    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);

    try {
        const user = await User.findOneAndUpdate(
            { email },
            { code, codeExpiration: expirationTime },
            { new: true, upsert: true }
        );

        if (!user) {
            return res.status(404).json({ error: "Código não enviado, usuário não encontrado!" });
        }

        const resend = new Resend(process.env.TOKEN_RESEND);

        const { data, error } = await resend.emails.send({
            from: "Barbershop <onboarding@resend.dev>",
            to: [email],
            subject: "Redefinir Senha 🔐",
            html: `<h2>Código : ${code}</h2>`
        });

        if (error) {
            return res.status(400).json({ error });
        }

        // Chamada do next() aqui, após o envio bem-sucedido do e-mail
        next();

        res.status(200).json({ success: true, code: code, data, Date });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return res.status(500).json({ success: false, error: "Erro interno do servidor" });
    }
}

function generateRandomCode(length: number): string {
    const characters = process.env.CODE as string;
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }

    return code;
}
