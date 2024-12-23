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

class Entity {
    constructor(name, messageBus) {
        this.name = name;
        this.messageBus = messageBus;
    }

    send(event, data) {
        console.log(`[${this.name}] Sending event: ${event}`, data);
        this.messageBus.sendMessage(event, data);
    }

    receive(event, callback) {
        console.log(`[${this.name}] Listening for event: ${event}`);
        this.messageBus.receiveMessage(event, callback);
    }
}

module.exports = { CancellableMessageBus, Entity };
