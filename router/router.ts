import { Router } from "express";
import { CheckLogin } from "../API/User/login";
import { userUpdate } from "../API/User/Update";
import { userDelete } from '../API/User/Delete';
import { showItens } from '../API/User/showItens';
import { verifyToken } from "../JWT/verifyToken";
import { CheckUser, CreateUser, ValidationUser } from '../API/User/Create';
import { sendMail } from "../API-Mail/linkReset";
import { newPass } from "../API/User/models/newPass";

const router = Router()

router.get('/users/auth',verifyToken,CheckLogin);
router.get('/users/showitens', showItens);
router.post('/users/createUser', ValidationUser,CheckUser,CreateUser);
router.put('/users/update/:id', userUpdate);
router.delete('/users/delete/:id',userDelete);
router.post('/users/reset/email', sendMail);
router.put('/users/reset/newpassword', newPass)

export default router;