function hello(message) {
  message = message || "Hello";
  console.log(message);
}
//console.log(hello);

function hello(message = "Hello World") {
  console.log(message);
}

let name = "Adam Anugrah";
let gender = "Laki-Laki";

//console.log(name + ' Memiliki jenis kelamin: ' + gender);
console.log(`${name} memiliki jenis kelamin: ${gender}`);
