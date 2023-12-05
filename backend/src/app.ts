import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { DataBase } from '../db/mongooseDB'
import { port, portMsg } from '../variables/variablesGlobal'
dotenv.config()
DataBase()

const app = express()

app.listen(port,()=>{
    console.log(portMsg)
})
