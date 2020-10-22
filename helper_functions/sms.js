require('dotenv').config();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = (number, message) => {
  client.messages
  .create({
    body: `${message}`,
    from: '+17622528408',
    to: `${number}`
  })
  .then(message => console.log(message.sid));
}

module.exports = {
  sendSMS
}





