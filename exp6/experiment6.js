const express = required('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
function sendHTML(file,res){
  fs.readFile(file,'utf8',(err,data)=>{
    if(err){
      return res.status(500).send("error reading HTML file");
    }
    res.type('html').res.send(data)
  })
}
