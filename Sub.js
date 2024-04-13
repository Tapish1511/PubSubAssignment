const {createClient} = require('redis');
require('dotenv').config();

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
      host: process.env.REDIS_ENDPOINT,
      port: 19910
  }
});

console.log("Received Message:");

(async()=>{
    await client.connect();

    await client.subscribe(process.env.CHANNEL_NAME, (message)=>{
        console.log(message);
    })
})();

