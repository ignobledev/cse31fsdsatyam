const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

// Event listener
emitter.on("greet", (name) => {
    console.log(`Hello ${name}!`);
});

emitter.on("exit", () => {
    console.log("Exit event triggered");
});

// Trigger events
emitter.emit("greet", "Satyam");
emitter.emit("exit");


const button = new EventEmitter();

button.on("click", () => {
    console.log("Button clicked!");
});

button.emit("click");
console.log("1. Start");

setTimeout(() => {
    console.log("4. setTimeout");
}, 0);

setImmediate(() => {
    console.log("5. setImmediate");
});

process.nextTick(() => {
    console.log("3. nextTick");
});

console.log("2. End");
