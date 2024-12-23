const MessageBus = require('./MessageBus');

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

module.exports = Entity;
