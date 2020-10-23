//express server
const express = require('express');
const router  = express.Router();

//helper functions
const updateDB = require('../helper_functions/updateDatabase');
const sms = require('../helper_functions/sms');

module.exports = (db) => {

  router.get("/homepage", (req, res) => {
    res.render('homepage');
  });

  router.get("/menu", (req, res) => {
    res.render('menu');
  });

  //dynamic confirmation page
  router.get("/OrderID/:id", (req, res) => {
    res.render('confirmation');
  });

  //gets * from users
  router.get("/getData/:id", (req, res) => {
    updateDB.getUserData(req.params.id, db)
    .then(user => {
      res.json(user.rows[0]);
    })
  });

  //gets completed_at from orders
  router.get("/orderComplete/:id", (req, res) => {
    updateDB.orderReady(req.params.id, db)
    .then(result => {
      res.json(result.rows[0])
    })
    .catch(err => console.log('error', err));
  });

  //gets confirmed, completed_at from orders
  router.get("/checkTimeData/:id", (req, res) => {
    updateDB.checkTime(req.params.id, db)
    .then(data => res.json(data.rows[0]))
    .catch((err) => console.log('err', err));
  });

  //inserts into db, sends sms, returns id from orders
  router.post("/updateOrderPurchase", (req, res)  => {
    sms.sendSMS(Number(req.body.phone), 'Your Order Has Been Placed!');
    sms.sendSMS(process.env.RESTAURANT_NUMBER, 'A New Order Has Been Placed!');

    updateDB.updateOrderPurchase(req.body, db)
    .then(result => {      res.json(result.rows);
    })
    .catch(err => console.log('error', err));
  });

  return router;

};
