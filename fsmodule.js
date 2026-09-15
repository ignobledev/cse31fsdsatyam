jaconst http = require('http');
const fs = require("fs");
//fs.writeFile("student.txt","hello this is file for  students",(err)=>{
// if(err){
 //   console.log(err);
 // }
//  else{
//    console.log("file uploaded successfully");
 // }
 // });
//  const server = http.createServer((req,res)=>
//{
    
  });

fs.readFile("student.txt","utf-8",(err,data)=>{
if(err){
    console.log("err");
  }
  else{
    console.log("content of file");
    console.log(object);
  }
});
fs.append("student.txt","file of cse",(err)=>{
  if(err) throw err
  else{
      console.log("updated");
    }
});
fs.unlink("student.txt",()=>{
  if(err) throw err
  else{
      console.log("file deleted");
    }
});
