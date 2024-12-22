const asyncFilter = require('./asyncFilterPromise');


const asyncFilter = require('./asyncFilterPromise');

async function asyncCallback(item, callback) {
    setTimeout(() => {
        if (item % 5 === 0) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    }, Math.random() * 1000);
}

async function testAsyncFilter() {
    const dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = await asyncFilter(dataset, asyncCallback);

    console.log("Test 1: asyncFilter processing data correctly");
    console.log("Expected:", [1, 2, 3, 4, 6, 7, 8, 9]);
    console.log("Actual:", result);

    if (JSON.stringify(result) === JSON.stringify([1, 2, 3, 4, 6, 7, 8, 9])) {
        console.log("Test 1 passed!\n");
    } else {
        console.log("Test 1 failed!\n");
    }
}

async function testAbort() {
    const dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const abortSignal = new AbortController();

    setTimeout(() => abortSignal.abort(), 1000);

    try {
        await asyncFilter(dataset, asyncCallback, 500, abortSignal.signal);
    } catch (error) {
        console.log("Test 2: Abort Test");
        console.log("Expected:", "Operation aborted");
        console.log("Actual:", error.message);

        if (error.message === "Operation aborted") {
            console.log("Test 2 passed!\n");
        } else {
            console.log("Test 2 failed!\n");
        }
    }
}

async function testDebounce() {
    const dataset = [1, 2, 3, 4, 5];
    const result = await asyncFilter(dataset, asyncCallback, 500);

    console.log("Test 3: asyncFilter with debounce");
    console.log("Expected:", [1, 2, 3, 4, 6]);
    console.log("Actual:", result);

    if (JSON.stringify(result) === JSON.stringify([1, 2, 3, 4, 6])) {
        console.log("Test 3 passed!\n");
    } else {
        console.log("Test 3 failed!\n");
    }
}

async function runTests() {
    await testAsyncFilter();
    await testAbort();
    await testDebounce();
}

runTests();
