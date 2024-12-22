const { asyncFilter } = require('./asyncFilter');

function asyncCheckIfEven(number, callback) {
    setTimeout(() => {
        if (number < 0) return callback(new Error("Negative numbers not allowed"));
        callback(null, number % 2 === 0);
    }, Math.random() * 500);
}

const numbers = [1, 2, 3, 4, -1, 6];

asyncFilter(
    numbers,
    asyncCheckIfEven,
    (err, results) => {
        if (err) {
            console.error("Error:", err.message);
        } else {
            console.log("Filtered Results:", results);
        }
    }
);
