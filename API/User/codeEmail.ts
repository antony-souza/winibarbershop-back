import { Request, Response } from "express";
import {  User } from "../../schema/userSchema";

export async function codeMail(req: Request, res: Response) {
    const { code } = req.body;

    try {
        
        const user = await User.findOne({code});

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        //!== verifica se é diferente
        if (user.code !== code) {
            return res.status(400).json({ message: "Código incorreto." });
        }
        
        return res.status(200).json({success:true, message: "Código correto. Trocar senha >>" });

    } catch (error) {
        console.error("Erro ao verificar o código:", error);
        return res.status(500).json({success:false, message: "Erro interno do servidor." });
    }
}
