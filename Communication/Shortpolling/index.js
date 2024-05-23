const  express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const port = 5111;

let data ="initial data";
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})

app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/getData",(req, res)=>{
    res.send({data})
})

app.get("/updateData",(req, res)=>{
    data="updated data"
    res.send({data})
})