const asyncFilter = async (array, asyncFunction, signal, debounceTime = 0) => {
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    const filteredArray = await Promise.all(
        array.map(async (item) => {
            if (signal && signal.aborted) {
                throw new Error('AbortError');
            }

            const abortPromise = new Promise((_, reject) => {
                if (signal) {
                    signal.addEventListener('abort', () => reject(new Error('AbortError')));
                }
            });

            const start = Date.now();

            try {
                const keep = await Promise.race([
                    asyncFunction(item, signal),
                    abortPromise,
                ]);
                const elapsed = Date.now() - start;
                const delay = Math.max(0, debounceTime - elapsed);

                await wait(delay);

                return keep ? item : null;
            } catch (err) {
                if (signal && signal.aborted) {
                    throw new Error('AbortError');
                }
                throw err;
            } finally {
                if (signal) {
                    signal.removeEventListener('abort', () => {});
                }
            }
        })
    );

    return filteredArray.filter(item => item !== null);
};

module.exports = asyncFilter;
