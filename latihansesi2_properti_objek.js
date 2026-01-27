var car = {
    brand : 'BMW',
    type : 'E300',
    year : 2020,
    odometer : 15000,
    drive : function() {
        console.log('The car is driving');
        this.odometer++;
    },
    stop : function() {
        console.log('The car has stopped');
    }
};

car.drive();
console.log(`Odometer: ${car.odometer} km`);