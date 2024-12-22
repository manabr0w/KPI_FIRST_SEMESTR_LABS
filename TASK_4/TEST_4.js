const asyncFilter = require('./asyncFilter');

async function asyncCallback(item, callback) {
    setTimeout(() => {
        if (item % 5 === 0) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    }, Math.random() * 1000);
}

test('asyncFilter processes data correctly', async () => {
    const dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const result = await asyncFilter(dataset, asyncCallback);

    expect(result).toEqual([1, 2, 3, 4, 6, 7, 8, 9]);
});

test('asyncFilter aborts processing correctly', async () => {
    const dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const abortSignal = new AbortController();

    setTimeout(() => abortSignal.abort(), 1000);

    try {
        await asyncFilter(dataset, asyncCallback, 500, abortSignal.signal);
    } catch (error) {
        expect(error.message).toBe('Operation aborted');
    }
});

test('asyncFilter processes with debounce correctly', async () => {
    const dataset = [1, 2, 3, 4, 5];
    const result = await asyncFilter(dataset, asyncCallback, 500);

    expect(result).toEqual([1, 2, 3, 4, 6]);
});
