const asyncFilter = require('./asyncFilter');

function asyncCheckIfEven(number, callback) {
    setTimeout(() => {
        if (number < 0) return callback(new Error("Negative numbers not allowed"));
        callback(null, number % 2 === 0);
    }, Math.random() * 300);
}


const numbers1 = [1, 2, 3, 4, 5, 6];
asyncFilter(
    numbers1,
    asyncCheckIfEven,
    (err, results) => {
        if (err) {
            console.error("Test 1 Error:", err.message);
        } else {
            console.log("Test 1 Results (Only Even Numbers):", results);
        }
    },
    500
);


const numbers2 = [-1, -2, -3, -4, -5, -6];
asyncFilter(
    numbers2,
    asyncCheckIfEven,
    (err, results) => {
        if (err) {
            console.error("Test 2 Error:", err.message);
        } else {
            console.log("Test 2 Results (Only Even Numbers):", results);
        }
    },
    500
);

const numbers3 = [0, 1, 2, 3, 4, 5, 6];
asyncFilter(
    numbers3,
    asyncCheckIfEven,
    (err, results) => {
        if (err) {
            console.error("Test 3 Error:", err.message);
        } else {
            console.log("Test 3 Results (Only Even Numbers):", results);
        }
    },
    500
);
