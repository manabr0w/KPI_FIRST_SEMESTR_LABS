const asyncFilter = require('./asyncFilter'); // Імпортуємо вашу функцію



const asyncCheckEven = (value, signal) => {
    let timeout;
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 2500) + 500;
        console.log(`Processing ${value} with delay ${delay}ms`);

        timeout = setTimeout(() => {
            if (typeof value !== 'number') {
                reject(new Error(`${value} is not a number!`));
            } else {
                resolve(value % 2 === 0);
            }
        }, delay);

        const abortHandler = () => {
            clearTimeout(timeout);
            reject(new Error('AbortError'));
        };

        if (signal) {
            signal.addEventListener('abort', abortHandler);
        }
    });
};

(async () => {
    console.log("\n=== Test 1: Фільтрація без скасування ===");
    const numbers1 = [1, 2, 5, 123, 3, 9, 0];
    try {
        const result1 = await asyncFilter(numbers1, asyncCheckEven, null, 100);
        console.log("Результат фільтрації:", result1);
    } catch (err) {
        console.error("Помилка:", err.message);

    }

    console.log("\n=== Test 2: Скасування через AbortController ===");
    const numbers2 = [1, 2, 5, 123, 3, 9, 0];
    const controller2 = new AbortController();
    const signal2 = controller2.signal;
    setTimeout(() => {
        console.log("Абортую операції...");
        controller2.abort();
    }, 2000);
    try {
        const result2 = await asyncFilter(numbers2, asyncCheckEven, signal2, 100);
        console.log("Результат фільтрації:", result2);
    } catch (err) {
        if (err.message === 'AbortError') {
            console.error("Операції було скасовано.");
        } else {
            console.error("Помилка:", err.message);
        }
    }

    console.log("\n=== Test 3: Обробка помилок ===");
    const numbers3 = [1, "two", 3, 4, "five"];
    try {
        const result3 = await asyncFilter(numbers3, asyncCheckEven, null, 100);
        console.log("Результат фільтрації:", result3);
    } catch (err) {
        console.error("Помилка:", err.message);
    }
})();
