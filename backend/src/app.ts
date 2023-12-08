import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { router } from '../router/router';
import { DataBase } from '../db/mongooseDB';
import { port, portMsg } from '../variables/variablesGlobal';
import { UserDelete } from '../API/User/Delete';
import { ShowItens } from '../API/User/showItens';
import { CheckUser, CreateUser, ValidationUser } from '../API/User/Create';
dotenv.config()
DataBase()

const app = express()
app.use(express.json());
app.use(cors())

router.get('/showitens', ShowItens)
router.post('/createUser', ValidationUser,CheckUser,CreateUser)
router.put('/update/:id', )
router.delete('/delete/:id',UserDelete)

app.listen(port,()=>{
    console.log(portMsg)
})
