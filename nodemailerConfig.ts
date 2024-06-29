import nodemailer from 'nodemailer'

// Configuração do transporter para enviar o email
export const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT_SMTP,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});
