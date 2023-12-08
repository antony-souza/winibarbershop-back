import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express'
import { DataBase } from '../db/mongooseDB';
import { port, portMsg } from '../variables/variablesGlobal';
import { UserDelete } from '../API/User/Delete';
import { ListItens } from '../API/User/showItens';
import { CheckUser, CreateUser, ValidationUser } from '../API/User/Create';
dotenv.config()
DataBase()

const app = express()
app.use(express.json());
app.use(cors())

app.get('/showitens', ListItens)
app.post('/createUser', ValidationUser,CheckUser,CreateUser)
app.put('/update/:id', )
app.delete('/delete/:id',UserDelete)

app.listen(port,()=>{
    console.log(portMsg)
})
