import cors  from 'cors'
import morgan from 'morgan'
import express from 'express'
import v1Routers from './Router/v1Routers.js'
import { AppError } from './utils/error.handler.js'
import {v2 as cloudinary} from 'cloudinary';


const bootstarp =(app)=>{

         
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

    app.use('/uploads', express.static('uploads'))
    app.use(express.json())

    app.use(cors())
   app.use(morgan('dev'))

   app.get('/',(req,res)=>{
    res.send('welcome in api doctor')
   })
   
app.use('/api/v1', v1Routers) 

app.all('*', (req, res, next) => {
    throw new AppError('Route not found', 404)
})

app.use((error, req, res, next) => {
    const { message, status, stack } = error

    res.status(status || 500).json({
        message,
        ...(process.env.MODE === 'development' && { stack }),
    })
})

}
export default bootstarp