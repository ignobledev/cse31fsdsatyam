                                                                          EXPERIMENT-4
                                                                          
OBJECTIVE:create basic HTTP server using http.createServer(),
respond with hello world and return header + status code
,
CODE:
const http = require("http");
const server = http.createServer((req,res)=>{
res.writeHead(200,{
    "content-type":'text/plaintext',
    "Server":'node.js'})
  res.end("hello world");
  });
port = 3005;
server.listen(port,()=>{
console.log(`server is running on http://localhost:${port}`);
})
