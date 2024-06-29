import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { DataBase } from '../db/mongooseDB';
import { errorHandler } from '../API/User/error';
import router from '../router/router';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer'

dotenv.config();
DataBase();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(errorHandler);

app.use(cors({
  origin:["https://winibarbershop.vercel.app","http://127.0.0.1:5501"]
})) 

app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log('url conectada')
});