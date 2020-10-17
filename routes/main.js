/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

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
  router.get("/confirmation", (req, res) => {
    res.render('confirmation');
  });

  //Success
  router.get("/success", (req, res) => {
    res.render('success');
  });

  return router;
};
