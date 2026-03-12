import express from 'express'
import {Env} from './lib/env.js';


const app=express();

app.get("/",(req,res)=>{
    res.json({
        success:true,
        msg:"Done"
    })
})

app.listen(Env.PORT,()=>{
    console.log(`Server is running on http://localhost:${Env.PORT}`)
})