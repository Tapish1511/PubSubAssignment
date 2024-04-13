const readline = require('node:readline');
const {createClient} = require('redis');
require('dotenv').config();

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
      host: process.env.REDIS_ENDPOINT,
      port: 19910
  }
});

client.connect();

const commandLineInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const CustomInput = async(query)=>new Promise(resolve=>commandLineInput.question(query, resolve));


(async ()=>{
  while(1){
    const option = await CustomInput('0. Exit\n1. Publish Message\n');
    if(option === '1'){
      const Message = await CustomInput('Enter your message\n');
      PublishMessage(Message);
    }
    else if(option === '0'){
      commandLineInput.close();
      client.disconnect();
      process.exit(0);
    }
    else{
      console.log('invalid operation');
    }
  }
})();

async function PublishMessage(Message){
  await client.publish(process.env.CHANNEL_NAME, Message);
}




