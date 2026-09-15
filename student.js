



const students = [
  { id: 1, name: "Rahul", age: 18, city: "Delhi", marks: 85 },
  { id: 2, name: "Priya", age: 19, city: "Mumbai", marks: 92 },
  { id: 3, name: "Aman", age: 18, city: "Lucknow", marks: 78 },
  { id: 4, name: "Neha", age: 20, city: "Jaipur", marks: 88 },
  { id: 5, name: "Rohit", age: 19, city: "Agra", marks: 81 },
  { id: 6, name: "Sneha", age: 18, city: "Agra", marks: 95 },
  { id: 7, name: "Arjun", age: 21, city: "Kanpur", marks: 74 },
  { id: 8, name: "Anjali", age: 20, city: "Delhi", marks: 89 },
  { id: 9, name: "Karan", age: 19, city: "Meerut", marks: 83 },
  { id: 10, name: "Pooja", age: 18, city: "Ghaziabad", marks: 91 }
];
var  st = students.filter(student=> student.city==="Delhi");
console.table(st);
var  st = students.filter(student=> student.city==="Agra");
console.table(st);
console.table(students);
