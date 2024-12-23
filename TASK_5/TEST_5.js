const { CancellableMessageBus, Entity } = require('./EventEmitterSolution');

const messageBus = new CancellableMessageBus();

const entityA = new Entity('EntityA', messageBus);
const entityB = new Entity('EntityB', messageBus);

console.time('Task Execution Time');

entityB.receive('greet', (data) => {
    console.log(`[EntityB] Received:`, data);
    console.timeEnd('Task Execution Time');
});

entityA.send('greet', { message: 'Hello from EntityA!' });
