let c = true;
console.log("Type of data c ",typeof c);
console.log("\n");
let d = Number.MAX_SAFE_INTEGER;
console.log("max limit of " ,d);

console.log(d+8);
let r = BigInt(d);
console.log(r);
let f = BigInt(d+40);
console.log(r+f);
let x;

console.log(x);
console.log(typeof x);
let y = null;
console.log(typeof y);
let h = Symbol();
let h1 = Symbol();
console.log("compare", h === h1);


const prompt = require("prompt-sync")();

let num = prompt("Enter your num: ");
if(num>=18){
console.log("eligible", num);
}
else {
  console.log("not eligible");
}

