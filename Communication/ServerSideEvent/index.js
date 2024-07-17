const express = require("express");
const app= express();
const {join} = require("node:path");

const port = 5111;

app.listen(port, (req, res)=>{
    console.log(`Server is running on:: ${port}`)
})

app.get("/", (req, res)=>{
res.sendFile(join(__dirname,"index.html"))
})

app.get("/sse",(req,res)=>{
    //sse setup logic
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control","no-cache");
    res.setHeader("Connection","keep-alive");

    res.write(`data: Welcome to Server Sent event \n\n`) ;
    const interval = setInterval(()=>{
        res.write(`data: Server sent time ${new Date().toLocaleDateString()} \n\n`)
    },5000);
    
    req.on("close",()=>{
        clearInterval(interval)
    })
     
})