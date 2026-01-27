function sum(...numbers) {
  let total = 0;
  for (let num of numbers) total += num;
  return total;
}

console.log(sum(1, 2, 3, 4, 5));

//destructuring dengan rest parameter
const biodata2 = {
  nama: "Adam Anugrah",
  nim: "231011750033",
  alamat: "Jl. Pala Raya NO 71 Pondok Cabe Udik",
};

const firstName = biodata2.nama;
console.log(firstName);

const arr = ["Adam", "Anugrah"];
const [name1, name2] = arr;
console.log(name1);
