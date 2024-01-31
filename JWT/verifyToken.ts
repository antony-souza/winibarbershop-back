import { getToken } from "./getToken";
import jwt from 'jsonwebtoken'

    export function verifyToken(req, res, next){
    const secret = process.env.JWT_SEC;

    if(!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado!" })
    }

    const token = getToken(req)

    if(!token) {
    return res.status(401).json({ message: "Acesso negado!" })
    }

    try {
    const compareJwt = jwt.verify(token, secret)
    req.user = compareJwt
    next()

    } catch(err) {
    console.log(err)
    res.status(400).json({ message: "Token inválido!" })
    }
    
    }
