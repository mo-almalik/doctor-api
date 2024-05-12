import dotenv from 'dotenv'
import multer from 'multer'
import express from 'express'
import dbcon from './config/db.js'
import bootstrap from './src/bootstrap.js'
dotenv.config()
const app = express()
// const upload = multer({ dest: 'uploads/' })


dbcon()
bootstrap(app)
const port = 3001

app.listen(process.env.PORT || port,()=>console.log(`app listen on port ${port}`) )