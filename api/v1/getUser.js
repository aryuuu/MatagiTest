const express = require('express');
const knex = require('knex');
const router = express.Router();
const User = require('../../models/User');

const { notFound } = require('./const');
/**
 * GET /api/v1/users
 */
router.get('/users', (req, res) => {
  User.query()
      .where({
          deletedAt: '0000-00-00 00:00:00'
      })
      .then(users => {
          if (users.length === 0 ) {
              res.json(notFound);
          } else {
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