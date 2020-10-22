/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const updateDB = require('../helper_functions/updateDatabase');
const sms = require('../helper_functions/sms');

module.exports = (db) => {
  //Homepage
  router.get("/homepage", (req, res) => {
    res.render('homepage');
  });

  //Menu
  router.get("/menu", (req, res) => {
    res.render('menu');
  });

  //Confirmation
  router.get("/OrderID/:id", (req, res) => {
    res.render('confirmation');
  });

  router.get("/getData/:id", (req, res) => {
    updateDB.getUserData(req.params.id, db)
    .then(user => {
      res.json(user.rows[0]);
    })
  });

  router.get("/orderComplete/:id", (req, res) => {
    updateDB.orderReady(req.params.id, db)
    .then(result => {
      res.json(result.rows[0])
    })
    .catch(err => console.log('error', err));
  });


  router.get("/checkTimeData/:id", (req, res) => {
    updateDB.checkTime(req.params.id, db)
    .then(data => res.json(data.rows[0]))
    .catch((err) => console.log('err', err));
  });

  router.post("/updateOrderPurchase", (req, res)  => {
    sms.sendSMS(Number(req.body.phone), 'Your Order Has Been Placed!');
    sms.sendSMS(process.env.RESTAURANT_NUMBER, 'A New Order Has Been Placed!');

    updateDB.updateOrderPurchase(req.body, db)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => console.log('error', err));
  });

  return router;

};
