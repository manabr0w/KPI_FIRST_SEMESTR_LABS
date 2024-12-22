function asyncFilter(arr, asyncCallback, debounceTime = 0, abortSignal) {
    const results = new Array(arr.length);

    return Promise.all(
        arr.map((item, index) => {
            if (abortSignal?.aborted) {
                return Promise.reject(new Error('Operation aborted'));
            }

            const start = Date.now();

            return new Promise((resolve, reject) => {
                asyncCallback(item, (err, keep) => {
                    if (err) {
                        return reject(err);
                    }

                    const elapsed = Date.now() - start;
                    const delay = debounceTime - elapsed > 0 ? debounceTime - elapsed : 0;

                    setTimeout(() => {
                        if (abortSignal?.aborted) {
                            return reject(new Error('Operation aborted'));
                        }

                        if (keep) results[index] = item;
                        resolve();
                    }, delay);
                });
            });
        })
    ).then(() => results.filter(x => x !== undefined));
    async function* asyncDataStream(arr) {
        for (let i = 0; i < arr.length; i++) {
            await new Promise(resolve => setTimeout(resolve, Math.random() * 500));
            yield arr[i];
        }
    }

    async function processStream() {
        const largeDataset = Array.from({ length: 1000 }, (_, i) => i + 1);
        const abortSignal = new AbortController();
        setTimeout(() => {
            abortSignal.abort();
        }, 2000);

        const results = [];
        try {
            for await (const item of asyncDataStream(largeDataset)) {
                await asyncFilter([item], asyncCallback, 500, abortSignal.signal);
                results.push(item);
            }
            console.log('Stream Processed Results:', results);
        } catch (error) {
            console.error('Stream Processing Error:', error);
        }
    }

    processStream();

}

module.exports = asyncFilter;
