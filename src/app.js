const express=require("express")
const {PrismaClient}=require("@prisma/client")
const app=express()
const useFiles=require("./routing/files")
const prisma= new PrismaClient()
app.use(express.json())

app.use("/files", useFiles)

app.use((err, req, res, next) => {
    return res.status(500).json({ error: err.message })
});

app.listen(3004, ()=>{
    console.log("serevr ishaldi");
});