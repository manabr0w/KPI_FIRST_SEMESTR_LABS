
function asyncFilter(arr, asyncCallback, finalCallback) {
    let results = [];
    let completed = 0;

    arr.forEach((item, index) => {
        const start = Date.now();

    asyncCallback(item, (err, keep) => {
        if (err) return finalCallback(err);

        const elapsed = Date.now() - start;
        const delay = debounceTime - elapsed > 0 ? debounceTime - elapsed : 0;


    })
}


module.exports =  asyncFilter ;