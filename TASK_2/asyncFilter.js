const asyncFilter = async (array, asyncCallback, debounceTime = 0) => {
    const filteredArray = [];

    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    for (const item of array) {
        const start = Date.now();

        try {
            const keep = await asyncCallback(item);
            const elapsed = Date.now() - start;
            const delay = debounceTime - elapsed > 0 ? debounceTime - elapsed : 0;

            await wait(delay);
            if (keep) filteredArray.push(item);
        } catch (err) {
            throw err;
        }
    }

    return filteredArray;
};

module.exports = asyncFilter;
