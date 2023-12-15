import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express'
import { DataBase } from '../db/mongooseDB';
import { port, portMsg } from '../variables/variablesGlobal';
import { errorHandler } from '../API/User/error';
import router from '../router/router';
dotenv.config()
DataBase()

const app = express()
app.use(express.json());
app.use(cors())
app.use(errorHandler)

app.use('/', router)

app.listen(port,()=>{
    console.log(portMsg)
})
