const taskPromise = () => {
    return new  Promise(resolve => {
        setTimeout(() =>{
            resolve("Selesai");
        }, 3000)
    });
}

const task = async () => {
    const done = await taskPromise();
    console.log("Hasil task : ", done);
};

console.log("Mulai");
task();
console.log("Akhir");

console.log("Program Selesai");