const asyncFilterPromise = require('./asyncFilterPromise');

const arr = [1, 2, 3, 4, 5];
const asyncCallback = (item, cb) => {
    setTimeout(() => {
        cb(null, item % 2 === 0);
    }, 100);
};

const controller = new AbortController();
const { signal } = controller;

setTimeout(() => {
    controller.abort();
}, 150);

(async () => {
    try {
        const filtered = await asyncFilterPromise(arr, asyncCallback, 50, signal);
        console.log("Filtered array:", filtered);
    } catch (error) {
        console.error("Error:", error.message);
    }
})();
