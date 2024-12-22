const asyncFilterPromise = require('./asyncFilterPromise');

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [10, 15, 20, 25, 30];

const asyncCallback = (item, cb) => {
    setTimeout(() => {
        cb(null, item % 2 === 0);
    }, 100);
};

const runTestWithAbort = async (arr, description, abortTimeout) => {
    console.log(`Running test: ${description}`);
    console.time(`Execution time for "${description}"`);

    const controller = new AbortController();
    const { signal } = controller;

    setTimeout(() => {
        controller.abort();
        console.log(`Test "${description}": Aborted`);
    }, abortTimeout);

    try {
        const filtered = await asyncFilterPromise(arr, asyncCallback, 50, signal);
        console.log(`Filtered array for "${description}":`, filtered);
    } catch (error) {
        console.error(`Error for "${description}":`, error.message);
    } finally {
        console.timeEnd(`Execution time for "${description}"`);
    }
};

(async () => {
    await runTestWithAbort(arr1, "Test with small array", 150);
    await runTestWithAbort(arr2, "Test with medium array", 50);
})();
