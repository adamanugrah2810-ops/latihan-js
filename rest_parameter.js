function sum(...numbers) {
  let total = 0;
  for (let num of numbers) total += num;
  return total;
}

console.log(sum(4, 9, 16, 3, 19, 23));
