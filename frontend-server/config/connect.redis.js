const redis = require('redis');
const client = redis.createClient({
    url: process.env.REDIS_URL
});
client.connect().then(()=>{
    console.log('connected to redis')
}).catch(console.error)

client.on('error', err => {
    console.log('Error ' + err);
});

module.exports= client
