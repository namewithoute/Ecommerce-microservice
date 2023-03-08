const amqplib = require('amqplib')

const { AMQP_CLOUD } = process.env
async function consumer(nameExchange,cb) {
    try {
        //1 create connection
        const conn = await amqplib.connect(AMQP_CLOUD)
        conn.once('error',(e)=>{
            console.log(e)
        })
        //2 create channel
        const channel = await conn.createChannel()
        // const nameExchange = 'addToCart'
        //3 create exchange routing message to queue
        await channel.assertExchange(nameExchange, 'fanout', { durable: true })
        //4  binding to queue
        const { queue } = await channel.assertQueue('', { exclusive: true })
        await channel.bindQueue(queue, nameExchange, '')
        await channel.consume(queue, cb, { noAck: true })
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = consumer