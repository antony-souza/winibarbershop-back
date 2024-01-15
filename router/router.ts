import { Router } from "express";
import { CheckLogin } from "../API/User/login";
import { userUpdate } from "../API/User/Update";
import { userDelete } from '../API/User/Delete';
import { showItens } from '../API/User/showItens';
import { CheckUser, CreateUser, ValidationUser } from '../API/User/Create';
import { routerJWT, verifyToken } from "../API/User/jwt";
import { dateCalender } from "../API/service/agends/agend";

const router = Router()

router.post('/users/login',CheckLogin,verifyToken,routerJWT);
router.get('/users/showitens', showItens);
router.post('/users/createUser', ValidationUser,CheckUser,CreateUser);
router.put('/users/update/:id', userUpdate);
router.delete('/users/delete/:id',userDelete);
router.post('/api/agend',dateCalender)

export default router;