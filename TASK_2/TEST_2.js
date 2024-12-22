const asyncFilterPromise = require('./asyncFilterPromise');

const arr = [1, 2, 3, 4, 5];

const asyncCallback = (item, cb) => {
    setTimeout(() => {
        cb(null, item % 2 === 0);
    }, 100);
};

(async () => {
    try {
        const filtered = await asyncFilterPromise(arr, asyncCallback, 50);
        console.log("Filtered array with async/await:", filtered);
    } catch (error) {
        console.error("Error:", error);
    }
})();
