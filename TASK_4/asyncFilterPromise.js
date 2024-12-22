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
}

module.exports = asyncFilter;
