import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { DataBase } from '../db/mongooseDB';
import { errorHandler } from '../API/User/error';
import router from '../router/router';
import bodyParser from 'body-parser';

dotenv.config();
DataBase();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(errorHandler);

// midd para solicitações do dom vercel
const corsOptions = {
  origin: 'https://winibarbershop.vercel.app',
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

app.use('/', router);
 
app.listen(process.env.PORT, () => {
  console.log('Conectado');
});
