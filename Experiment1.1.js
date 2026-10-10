
const EventEmitter = require("events");
const button = new EventEmitter();
button.on("click",()=>{
  console.log("button was clikced");
});
button.on("mouseover",()=>{
  console.log("mouse is over the button");
});
button.on("click",()=>{
  console.log("performing another click action..");
});
console.log("Simulating click");
button.emit("click");
console.log("Simulating mouseover");

