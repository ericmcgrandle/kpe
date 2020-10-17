require('dotenv').config();

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'An order has been received!',
    from: '+17622528408',
    to: '+17788723562'
  })
  .then(message => console.log(message.sid));
