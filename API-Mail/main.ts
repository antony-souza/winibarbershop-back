import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transportador = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   service: 'gmail',
   auth: {
    user:process.env.EMAIL,
    pass:process.env.PASS
   }
})

const sendEmail = {
    from: process.env.EMAIL,
    to: 'antony.nunes@proton.me',
    subject: 'Test de envio',
    text: 'Hello World, email!'
}

transportador.sendMail(sendEmail)