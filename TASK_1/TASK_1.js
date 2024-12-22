
function asyncFilter(arr, asyncCallback, finalCallback) {
    let results = [];
    let completed = 0;

    arr.forEach((item, index) => {
        asyncCallback(item, (err, keep) => {
            if (err) return finalCallback(err);

            if (keep) results.push(item);
            completed++;
            if (completed === arr.length) {
                finalCallback(null, results);
            }
        });
    });
}


module.exports =  asyncFilter ;