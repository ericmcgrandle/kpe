const express = require('express');
const router  = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));

const helperFunctions = require('../helper_functions/admin');
const pendingData = require('../helper_functions/pendingData');
const updateDB = require('../helper_functions/updateDatabase');
const send_sms = require('../helper_functions/sms');
const sms = require('../helper_functions/sms');
const pastOrdersPending = require('../helper_functions/pastOrdersPending')


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

  router.get("/past_orders_data", (req,res) => {
    pastOrdersPending.getPastOrders(db)
    .then(data => res.json(data))
    .catch(err => console.log('error', err));
  });

  //admin_login
  router.post("/login", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    helperFunctions.getUser(name, db)
    .then(user => helperFunctions.validateUser(user[0], name, password, res))
    .catch(err => console.log('error with login', err));
  });

  //update time database confirm button
  router.post("/updateTimeDatabase", (req, res) => {
    const time = req.body.inputVal;
    updateDB.updateTimeDatabase(req.body, db)
    .then(result => {
      sms.sendSMS(result.rows[0].phone, `Your order will be ready in ${time} minutes!`);
      res.sendStatus(200);
    })
    .catch(err => console.log('err', err));
  });

  //update database complete button
  router.post("/updateCompletedTime", (req, res) => {
    updateDB.updateCompletedAt(req.body, db)
    .then(result => {
      sms.sendSMS(result.rows[0].phone, 'Your order is ready for pickup!');
      res.sendStatus(200);
    })
    .catch(err => console.log('err', err))
  });

  return router;
};


