const express = require("express");

const app = express();
const port = 5111;

app.use((req,res,next)=>{
    res.setHeader(
        'Content-Security-Policy', 
        "default-src 'self';" + // loads only same origin self scripts, it won't inject external scripts 
        "script-src 'self' 'unsafe-inline' 'nonce-randomKey' http://unsecure.com;"  // "script-src 'self' http://unsecure.com;" - load same origin script and then particular origin script
    )  
   next();
})
app.use(express.static("public"))

app.listen(port, ()=>{
    console.log(`server successfully running on ${port}`)
});

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

