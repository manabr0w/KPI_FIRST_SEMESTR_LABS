const asyncFilterPromise = require('./asyncFilterPromise');

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [10, 15, 20, 25, 30];
const arr3 = [100, 200, 300, 400, 500];

const asyncCallback = (item, cb) => {
    setTimeout(() => {
        cb(null, item % 2 === 0);
    }, Math.random() * 100);
};

const runTest = async (arr, debounceTime, description) => {
    console.log(`Running test: ${description}`);
    const start = Date.now();

    try {
        const filtered = await asyncFilterPromise(arr, asyncCallback, debounceTime);
        console.log(`Filtered array:`, filtered);
    } catch (error) {
        console.error("Error:", error);
    }

    const elapsed = Date.now() - start;
    console.log(`Test "${description}" completed in ${elapsed} ms\n`);
};

(async () => {
    await runTest(arr1, 50, "Test with small array");
    await runTest(arr2, 100, "Test with medium array");
    await runTest(arr3, 150, "Test with large array");
})();
