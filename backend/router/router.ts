import { Router } from "express";
import { UserDelete } from '../API/User/Delete';
import { ListItens } from '../API/User/showItens';
import { CheckUser, CreateUser, ValidationUser } from '../API/User/Create';
const listItens    = Router()
const createRouter = Router()
const updateRouter = Router()
const deleteRouter = Router()

listItens.get('/showitens', ListItens);
createRouter.post('/createUser', ValidationUser,CheckUser,CreateUser)
updateRouter.put('/update/:id', )
deleteRouter.delete('/delete/:id',UserDelete)


