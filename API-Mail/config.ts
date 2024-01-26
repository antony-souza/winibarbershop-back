import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "06703584f2d72e",
      pass: "849ad1161c63b9"
    }
  });

const sendEmail = {
    from: process.env.EMAIL,
    to: 'antony.nunes@proton.me',
    subject: 'Test de envio',
    text: 'Hello World, email!'
}

transport.sendMail(sendEmail,(err)=>{
    if(err){
        console.log(err)
    }
})