const express=require("express")
const app=express()
const useFiles=require("./routing/files")
app.use(express.json())

app.use("/files", useFiles)


app.listen(3004, ()=>{
    console.log("Serevr running");
});