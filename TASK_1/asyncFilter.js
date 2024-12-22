function asyncFilter(arr, asyncCallback, finalCallback, debounceTime = 0) {
    let results = [];
    let completed = 0;
    let errorOcurred = false;

    arr.forEach((item, index) => {
        if (errorOcurred) return;

        const start = Date.now();

        asyncCallback(item, (err, keep) => {
            if (err) {
                errorOcurred = true;
                return finalCallback(err);
            }

            const elapsed = Date.now() - start;
            const delay = debounceTime - elapsed > 0 ? debounceTime - elapsed : 0;

            setTimeout(() => {
                if (keep) results.push(item);
                completed++;
                if (completed === arr.length) {
                    finalCallback(null, results);
                }
            }, delay);
        });
    });
}

module.exports = asyncFilter;
