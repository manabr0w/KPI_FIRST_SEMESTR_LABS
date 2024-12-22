const { asyncFilter } = require('./asyncFilter');

function asyncCheckIfEven(number, callback) {
    setTimeout(() => {
        if (number < 0) return callback(new Error("Negative numbers not allowed"));
        callback(null, number % 2 === 0);
    }, Math.random() * 500);
}