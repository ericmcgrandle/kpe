const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //Login
  router.get("/login", (req, res) => {
    res.render('login');
  });

  //Pending
  router.get("/pending", (req, res) => {
    res.render('pending');
  });

  //Past_orders
  router.get("/past_orders", (req, res) => {
    res.render('past_orders');
  });

  return router;
};
