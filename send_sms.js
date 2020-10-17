const accountSid = 'AC78dea384338d08883f2dd5f4e0170548';
const authToken = '0e0ced3bb5a7e5c7818c2f503815d81c';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'An order has been received!',
    from: '+17622528408',
    to: '+17788723562'
  })
  .then(message => console.log(message.sid));
