const amqplib = require('amqplib')
const AMQP_CLOUD = 'amqps://yhlzjzcp:Oj-E_DYc9xJIK389PJZbHyPM7wyRyxR_@armadillo.rmq.cloudamqp.com/yhlzjzcp'

var ConnectSingleton = function () {
    var channel;
    async function createConnect() {
        var conn = await amqplib.connect(AMQP_CLOUD)
        conn.once('error', async (e)=>{
        })
        channel = await conn.createChannel()

        //3 create exchange routing message to queue
        // await channel.publish(nameExchange, '', Buffer.from(msg))
        return channel
            
    }

    return {
        getConnection: async function () {
            if (!channel) {
                console.log('new')
                channel = await createConnect();
            }
            return channel;
        },
        assertExchange:async function (nameExchange){
            await channel.assertExchange(nameExchange, 'fanout', { durable: true })
        },
        publishMessage:async function(nameExchange,msg){
            await channel.publish(nameExchange, '', Buffer.from(JSON.stringify(msg)))
        }
    };
};


// async function connect(msg) {
//     try{
//     //1 create connection
//     const conn = await amqplib.connect(AMQP_CLOUD)
//     //2 create channel
//     const channel = await conn.createChannel()
//     const nameExchange = 'cart'
//     //3 create exchange routing message to queue
//     await channel.assertExchange(nameExchange, 'fanout', { durable: true })
//     //4  binding to queue
//     // const {queue }=await channel.assertQueue('',{
//     //     durable:true
//     // })
//     // await channel.bindExchange(queue,nameExchange,'')
//     await channel.publish(nameExchange,'',Buffer.from(msg))
//     }
//     catch(e){
//         console.log(e)
//     }
// }



module.exports = ConnectSingleton()