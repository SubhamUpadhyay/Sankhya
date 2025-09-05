const {createClient} = require("redis");
require('dotenv').config()

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host:process.env.REDIS_HOSTID,
        port: 13686
    },
    
});


module.exports = redisClient;