import mongoose from "mongoose";
const dbcon= ()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log('DB connected ..');
    }).catch(()=>console.error('DB connection failed'))
}

export default dbcon