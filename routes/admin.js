const express = require('express');
const router  = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));

const helperFunctions = require('../helper_functions/admin_login');

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


  //admin_login
  router.post("/login", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    helperFunctions.getUser(name, db)
    .then(user => helperFunctions.validateUser(user[0], name, password, res))
    .catch(err => console.log('error with login', err));
  });

  return router;
};
