import { Router } from "express";
import { CheckLogin } from "../API/User/login";
import { userUpdate } from "../API/User/Update";
import { userDelete } from '../API/User/Delete';
import { showItens } from '../API/User/showItens';
import { CheckUser, CreateUser, ValidationUser } from '../API/User/Create';
import { routerJWT, verifyToken } from "../API/User/jwt";
import { sendMail } from "../API-Mail/main";

const router = Router()

router.post('/users/auth',CheckLogin,verifyToken,routerJWT);
router.get('/users/showitens', showItens);
router.post('/users/createUser', ValidationUser,CheckUser,CreateUser);
router.put('/users/update/:id', userUpdate);
router.delete('/users/delete/:id',userDelete);
router.get('/users/reset', sendMail);

export default router;