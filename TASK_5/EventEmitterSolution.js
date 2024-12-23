const { EventEmitter } = require('events');

class CancellableMessageBus extends EventEmitter {
    constructor() {
        super();
        this.abortControllers = new Map();
    }

    sendMessage(event, data, abortSignal) {
        if (abortSignal?.aborted) {
            console.log(`[CancellableMessageBus] Message aborted: ${event}`);
            return;
        }

        this.emit(event, data);
    }

    cancelMessage(event) {
        const abortController = this.abortControllers.get(event);
        if (abortController) {
            abortController.abort();
            console.log(`[CancellableMessageBus] Cancelled event: ${event}`);
        }
    }

    createAbortSignal(event) {
        const abortController = new AbortController();
        this.abortControllers.set(event, abortController);
        return abortController.signal;
    }
}

module.exports = CancellableMessageBus;
