import { Router } from "express";
import { CheckLogin } from "../API/User/login";
import { userUpdate } from "../API/User/Update";
import { userDelete } from '../API/User/Delete';
import { showItens } from '../API/User/showItens';
import { CheckUser, CreateUser, ValidationUser } from '../API/User/Create';
import { newPass } from "../API/User/newPass";
import { sendMail } from "../API/User/linkReset";
import { codeMail } from "../API/User/codeEmail";

const router = Router();

router.post('/users/auth', CheckLogin);
router.get('/users/showitens', showItens);
router.post('/users/createUser', ValidationUser,CheckUser,CreateUser);
router.put('/users/update/:id', userUpdate);
router.delete('/users/delete/:id',userDelete);
router.post('/users/reset/email', sendMail);
router.put('/users/reset/newpassword/',newPass);
router.post('/users/reset/code/', codeMail);

export default router