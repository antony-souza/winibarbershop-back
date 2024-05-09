import { Router } from "express";
import { CheckLogin } from "../API/User/login";
import { userUpdate } from "../API/User/Update";
import { userDelete } from '../API/User/Delete';
import { showItens } from '../API/User/showItens';
import { CheckUser, CreateUser, ValidationUser } from '../API/User/Create';
import { newPass } from "../API/User/newPass";
import { sendMail } from "../API/User/linkReset";
import { codeMail } from "../API/User/codeEmail";
import { authenticateToken } from "../middleware/authenticateToken";
import { GetUserAuth } from "../API/controllers/getUserController";
import { Schedule } from "../API/agendamentos/Schedule";
import { showSchedule } from "../API/agendamentos/showSchedule";
import { deleteSchedules } from "../API/agendamentos/deleteSchedule";
import openaiAPI from "../API/GPT/main";



const router = Router();

router.post('/auth', CheckLogin);
router.get('/gettoken',authenticateToken, GetUserAuth);
router.post('/Schedule',Schedule);
router.delete('/delete/Schedule/:id',deleteSchedules);
router.get('/showSchedule', showSchedule)
router.get('/showUser', showItens);
router.post('/createUser', ValidationUser,CheckUser,CreateUser);
router.put('/update/:id', userUpdate);
router.delete('/delete/:id',userDelete);
router.post('/reset/email', sendMail);
router.put('/reset/newpassword',newPass);
router.post('/reset/code', codeMail);
router.post('/v1/chat/completions',openaiAPI)

export default router