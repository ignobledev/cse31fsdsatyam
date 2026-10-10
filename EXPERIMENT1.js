
const EventEmitter = require("events");
class MyEmitter extends EventEmitter{}
const myEmitter = new MyEmitter();
myEmitter.on("greet",(name)=>{
  console.log(`hello,${name}!`);
});
myEmitter.on("exit",()=>{
  console.log("Exit event triggered");
});
myEmitter.emit("greet","student");
myEmitter.emit("exit");

