console.log("1.program started");
setTimeout(()=>{
  console.log("2.set TimeOut Executed");
},4000);
setImmediate(() =>{
  console.log("setImmediate execure");
});
process.nextTick(()=>{
  console.log("process next Tick");
});
console.log("5 finished");

