const express=require("express")
require("dotenv").config()

const app=express()
app.get("/",(req,res)=>{
res.send("done")
})

app.listen(process.env.PORT||5000,()=>{
    console.log("port is running")
})



















