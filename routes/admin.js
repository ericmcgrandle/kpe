const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');


module.exports = (db) => {


  router.use(bodyParser.urlencoded({extended: true}));


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


  //Event listener for admin_login
  router.post("/login", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    console.log('name', name);
    console.log('password', password);
  });

  return router;
};
