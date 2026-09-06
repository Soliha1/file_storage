const express=require("express")
const {PrismaClient}=require("@prisma/client")
const app=express()
const useFiles=require("./routing/files")
const prisma= new PrismaClient()
app.use(express.json())

app.use("/files", useFiles)


app.listen(3004, ()=>{
    console.log("serevr ishaldi");
});