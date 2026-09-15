const fs = require("fs");
fs.writeFile("data.text","hello Node.js",(err)=>{
  if(err) throw err;
console.log("file created");
});
fs.readFile("data.text","utf8",(err,data)=>{
  if(err) throw err;
console.log(data);
});
fs.appendFile("data.text","\njoin new line",(err)=>{
  console.log("file updated");
});
fs.unlink("data.text",(err)=>{
  if (err) throw err;
console.log("File deleted");
});
