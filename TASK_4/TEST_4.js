async function asyncCallback(item, callback) {
    setTimeout(() => {
        if (item % 5 === 0) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    }, Math.random() * 1000);
}

const largeDataset = Array.from({ length: 1000 }, (_, i) => i + 1);

const abortSignal = new AbortController();
setTimeout(() => {
    abortSignal.abort();
}, 2000);

asyncFilter(largeDataset, asyncCallback, 500, abortSignal.signal)
    .then((results) => {
        console.log('Processed Results:', results);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
