import { Request, Response } from "express";
import { Resend } from "resend";

const resend = new Resend(process.env.TOKEN_RESEND);

export async function sendMail(req:Request, res:Response) {
    const { data, error } = await resend.emails.send({
        from: "antonygustavo10202016@gmail.com",
        to: ["antony.nunes@proton.me"],
        subject: "Um belo teste",
        html: "<strong>Deu certo mermão!!</strong>",
      });
    
      if (error) {
        return res.status(400).json({ error });
      }
    
      res.status(200).json({ data });
    }