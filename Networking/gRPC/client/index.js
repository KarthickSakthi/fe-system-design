const client = require("./client")

const express = require("express");
const bodyParser = require("body-parser");

const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log("Server running at port ", PORT)
})

app.get('/',(req, res)=>{
  client.getAll(null, (err, data)=>{
    if(!err){
        res.send(data.customers)
    }
  })
})

app.get('/create',()=>{
    
})

app.get('/update',()=>{
    
})

app.get('/remove',()=>{
    
})