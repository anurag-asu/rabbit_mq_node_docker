const amqplib = require('amqplib');
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5673';

const exchange = 'custom_exchange';
const queue = 'custom_queue';
const routingKey = 'custom_routing';

const publishMessage = async (data = {}) => {
    const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
    const channel = await connection.createChannel()
    try {
        console.log('Publishing');

        await channel.assertExchange(exchange, 'direct', {durable: true});
        await channel.assertQueue(queue, {durable: true});
        await channel.bindQueue(queue, exchange, routingKey);

        await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(data)));

        console.log('Message published');

    } catch(e) {

        console.error('Error in publishing message', e);

    } finally {

        console.info('Closing channel and connection if available');
        await channel.close();
        await connection.close();
        console.info('Channel and connection closed');

    }
};

module.exports = { publishMessage };

