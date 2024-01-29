import { Request, Response } from "express";
import { Resend } from "resend";

const resend = new Resend(process.env.TOKEN_RESEND);

export async function sendMail(req:Request, res:Response) {
  
    const { data, error } = await resend.emails.send({
        from: "Barbershop <onboarding@resend.dev>",
        to: ["antonygustavo10202016@gmail.com"],
        subject: "Token - Redefinir Senha",
        html: `<strong>Copie o TOKEN e cole na caixa vazia para uma nova senha!</strong><p>Token:</p>`
        ,
      });
    
      if (error) {
        return res.status(400).json({ error });
      }
    
      res.status(200).json({ data });
    }