const asyncFilter = require('./asyncFilter');

function asyncCheckIfEven(number, callback) {
    setTimeout(() => {
        if (number < 0) return callback(new Error("Negative numbers not allowed"));
        callback(null, number % 2 === 0);
    }, Math.random() * 300);
}


const numbers1 = [1, 2, 3, 4, 5, 6];
console.time("Test 1 Execution Time");
asyncFilter(
    numbers1,
    asyncCheckIfEven,
    (err, results) => {
        console.timeEnd("Test 1 Execution Time");
        if (err) {
            console.error("Test 1 Error:", err.message);
        } else {
            console.log("Test 1 Results (Only Even Numbers):", results);
        }
    },
    500
);

const numbers2 = [-1, -2, -3, -4, -5, -6];
console.time("Test 2 Execution Time");
asyncFilter(
    numbers2,
    asyncCheckIfEven,
    (err, results) => {
        console.timeEnd("Test 2 Execution Time");
        if (err) {
            console.error("Test 2 Error:", err.message);
        } else {
            console.log("Test 2 Results (Only Even Numbers):", results);
        }
    },
    500
);

const numbers3 = [0, 1, 2, 3, 4, 5, 6];
console.time("Test 3 Execution Time");
asyncFilter(
    numbers3,
    asyncCheckIfEven,
    (err, results) => {
        console.timeEnd("Test 3 Execution Time");
        if (err) {
            console.error("Test 3 Error:", err.message);
        } else {
            console.log("Test 3 Results (Only Even Numbers):", results);
        }
    },
    500
);
