const express = require('express');
const knex = require('knex');
const router = express.Router();
const User = require('../../models/User');

const { notFound } = require('./const');

router.get('/users/:id', (req, res) => {
    let id = req.params.id;
    User.query()
        .where({
            IndonesianId: id,
            deletedAt: '0000-00-00 00:00:00'
        })
        .then(users => {
            if (users.length === 0) {
                res.status(400);
                res.json(notFound)
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