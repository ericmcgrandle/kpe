const express = require('express');
const router  = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));

const helperFunctions = require('../helper_functions/admin');
const pendingData = require('../helper_functions/pendingData');
const updateDB = require('../helper_functions/updateTimeDatabase');
const send_sms = require('../helper_functions/sms');
const sms = require('../helper_functions/sms');


module.exports = (db) => {

  //Login
  router.get("/login", (req, res) => {
    res.render('login');
  });

  //Pending
  router.get("/pending", (req, res) => {
    res.render('pending');
  });

  router.get("/pending_data", (req, res) => {
    //gets data from pending_backend
    pendingData.getPending(db)
    .then(orders => {
      res.json(orders);
    })
    .catch(err => console.log('error with pending_data', err));
  })

  //Past_orders
  router.get("/past_orders", (req, res) => {
    res.render('past_orders');
  });

  //admin_login
  router.post("/login", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    helperFunctions.getUser(name, db)
    .then(user => helperFunctions.validateUser(user[0], name, password, res))
    .catch(err => console.log('error with login', err));
  });

  //update time database
  router.post("/updateTimeDatabase", (req, res) => {
    const time = req.body.inputVal;
    updateDB.updateTimeDatabase(req.body, db)
    .then(res => {
      sms.sendSMS(res.rows[0].phone, `Your order will be ready in ${time} minutes!`);
    })
    .catch(err => console.log('err', err));
  });

  return router;
};
