var car = {
  brand: "Honda",
  type: "Jazz",
  year: 2011,
  odometer: 100000,
  drive: function () {
    console.log("Driving...");
    this.odometer++;
  },
  stop: function () {
    console.log("Stopped.");
  },
};

console.log("Mobil saya: " + car.brand + " " + car.type);
car.drive();
console.log("Odometer sekarang: " + car.odometer);
