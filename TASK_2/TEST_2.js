const asyncFilterPromise = require('./asyncFilterPromise');

const arr = [1, 2, 3, 4, 5];

const asyncCallback = (item, cb) => {
    setTimeout(() => {
        cb(null, item % 2 === 0);
    }, 100);
};

asyncFilterPromise(arr, asyncCallback, 50)
    .then(filtered => {
        console.log("Filtered array:", filtered);
    })
    .catch(err => {
        console.error("Error:", err);
    });
