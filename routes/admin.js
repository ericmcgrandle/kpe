//TODO

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/pending", (req, res) => {
    console.log('pending orders');
  });
  return router;
};
