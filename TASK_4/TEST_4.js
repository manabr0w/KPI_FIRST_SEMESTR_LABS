const asyncFilterBatch = async function* (array, asyncCallback, signal, batchSize = 5) {
    for (let i = 0; i < array.length; i += batchSize) {
        if (signal.aborted) {
            console.error("Task was aborted");
            throw new Error("Task was aborted");
        }

        const batch = array.slice(i, i + batchSize);
        try {
            const keepItems = await asyncCallback(batch, signal);
            const filteredBatch = batch.filter((_, index) => keepItems[index]);
            console.log(`Batch processed: ${batch} -> ${filteredBatch}`);
            yield filteredBatch;
        } catch (err) {
            console.error(`Error processing batch ${batch}: ${err.message}`);
            yield [];
        }
    }
};

const asyncCheckEven = async (batch, signal) => {
    return Promise.all(
        batch.map(item => {
            if (signal.aborted) {
                throw new Error('AbortError');
            }

            return new Promise((resolve) => {
                const delay = Math.floor(Math.random() * 2000) + 500;
                console.log(`Checking item ${item} with delay ${delay}ms`);

                setTimeout(() => {
                    if (typeof item !== 'number') {
                        console.error(`${item} is not a number!`);
                        resolve(false);
                    } else {
                        resolve(item % 2 === 0);
                    }
                }, delay);
            });
        })
    );
};

const numbers = [1, 'some text', 3, 4, 5, 6];
const duplicatedArray = [];
for (let i = 0; i < 5000; i++) {
    duplicatedArray.push(...numbers);
}

async function runTask() {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const cancelTimeout = setTimeout(() => {
        abortController.abort();
    }, 5000);

    try {
        for await (const batchResult of asyncFilterBatch(duplicatedArray, asyncCheckEven, signal, 5)) {
            console.log("Filtered batch result:", batchResult);
        }
    } catch (err) {
        if (signal.aborted) {
            console.error("Processing was aborted.");
        } else {
            console.error(err.message);
        }
    } finally {
        clearTimeout(cancelTimeout);
    }
}

runTask();
