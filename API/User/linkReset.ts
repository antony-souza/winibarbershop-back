import { NextFunction, Request, Response } from "express";
import { User } from "../../schema/userSchema";
import dotenv from 'dotenv';
import { transporter } from "../../nodemailerConfig";

// Carregar variáveis de ambiente
dotenv.config();

export async function sendEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const code = generateRandomCode(8);

    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);

    try {
        console.log("Buscando e atualizando o usuário no banco de dados...");
        const user = await User.findOneAndUpdate(
            { email },
            { code, codeExpiration: expirationTime },
            { new: true, upsert: true }
        );

        if (!user) {
            console.error("Usuário não encontrado");
            return res.status(404).json({ error: "Código não enviado, usuário não encontrado!" });
        }

        const configEmail = {
            from: `Barbershop!<${process.env.EMAIL}>`,
            to: email,
            subject: "Redefinir Senha 🔐",
            html: `<h2>Código:${code}</h2>`
        };

        console.log("Enviando email com a configuração:", configEmail);
        await transporter.sendMail(configEmail);

        console.log("Email enviado com sucesso");
        return res.status(200).json({ success: true, code: code, message: "Email enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);

        // Verificando se o erro é relacionado ao nodemailer
        if (error.response) {
            console.error("Resposta do servidor de email:", error.response);
        }

        return res.status(500).json({ success: false, error: "Erro interno do servidor", details: error.message });
    }
}

function generateRandomCode(length: number): string {
    const characters = process.env.CODE as String; // Use variáveis de ambiente ou um default
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }

    return code;
}
