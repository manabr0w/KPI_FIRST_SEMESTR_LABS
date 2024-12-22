function asyncFilterPromise(arr, asyncCallback, debounceTime = 0) {
    const results = new Array(arr.length);

    return Promise.all(
        arr.map((item, index) => {
            const start = Date.now();

            return new Promise((resolve, reject) => {
                asyncCallback(item, (err, keep) => {
                    if (err) {
                        return reject(err);
                    }

                    const elapsed = Date.now() - start;
                    const delay = debounceTime - elapsed > 0 ? debounceTime - elapsed : 0;

                    setTimeout(() => {
                        if (keep) results[index] = item;
                        resolve();
                    }, delay);
                });
            });
        })
    ).then(() => results.filter(x => x !== undefined));
}

module.exports = asyncFilterPromise;
