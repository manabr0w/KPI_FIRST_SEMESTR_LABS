function asyncFilter(arr, asyncCallback, finalCallback, debounceTime = 0) {
    let results = new Array(arr.length);
    let completed = 0;
    let errorOccurred = false;

    arr.forEach((item, index) => {
        if (errorOccurred) return;

        const start = Date.now();

        asyncCallback(item, (err, keep) => {
            if (err) {
                if (!errorOccurred) {
                    errorOccurred = true;
                    return finalCallback(err);
                }
            }

            const elapsed = Date.now() - start;
            const delay = debounceTime - elapsed > 0 ? debounceTime - elapsed : 0;

            setTimeout(() => {
                if (!errorOccurred && keep) results[index] = item;
                completed++;

                if (completed === arr.length && !errorOccurred) {
                    finalCallback(null, results.filter(x => x !== undefined));
                }
            }, delay);
        });
    });
}

module.exports = asyncFilter;
