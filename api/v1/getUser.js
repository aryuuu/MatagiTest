const express = require('express');
const knex = require('knex');
const router = express.Router();
const User = require('../../models/User');

const { notFound } = require('./const');

/**
 * @module getUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {undefined}
 */


router.get('/users', (req, res) => {
  User.query()
      .where({
          deletedAt: '0000-00-00 00:00:00'
      })
      .then(users => {
          if (users.length === 0 ) {
              res.json(404)
              res.json(notFound);
          } else {
              console.log
            res.json({
                message: "success",
                users: users
            })
          }

      })
});

module.exports = {
    router: router
};