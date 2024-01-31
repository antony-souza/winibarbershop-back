import { Request, Response } from "express";
import { Resend } from "resend";
import { createToken } from "../JWT/createToken";



export async function sendMail(req: Request, res: Response) {
    const resend = new Resend(process.env.TOKEN_RESEND);

    // Gerar um código aleatório de 6 dígitos
    const code = generateRandomCode(6);

    const { data, error } = await resend.emails.send({
        from: "Barbershop <onboarding@resend.dev>",
        to: ["antonygustavo10202016@gmail.com"],
        subject: "Código - Redefinir Senha",
        html: `<strong>Copie o código abaixo e cole na caixa de redefinição de senha:</strong><p>Código: ${code}</p>`
    });

    if (error) {
        return res.status(400).json({ error });
    }

    res.status(200).json({ data });
}

function generateRandomCode(length: number): string {
    const characters = '0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomCode = Math.floor(Math.random() * characters.length);
        code += characters[randomCode];
    }
    return code;
}
