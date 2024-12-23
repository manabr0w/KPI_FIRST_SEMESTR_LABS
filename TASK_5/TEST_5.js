const MessageBus = require('./MessageBus');
const Entity = require('./Entity');

const messageBus = new MessageBus();

const entityA = new Entity('EntityA', messageBus);
const entityB = new Entity('EntityB', messageBus);

entityB.receive('greet', (data) => {
    console.log(`[EntityB] Received:`, data);
});

entityA.send('greet', { message: 'Hello from EntityA!' });
