const EventEmitter = require('events');

class MessageBus extends EventEmitter {
    sendMessage(event, data) {
        this.emit(event, data);
    }

    receiveMessage(event, callback) {
        this.on(event, callback);
    }
}

module.exports = MessageBus;
