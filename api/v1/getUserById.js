const express = require('express');
const knex = require('knex');
const router = express.Router();
const User = require('../../models/User');

const { notFound, idRE, invalidId } = require('./const');

/**
 * @module getUserById
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {undefined}
 */


router.get('/users/:id', (req, res) => {
    let id = req.params.id;

    if (id.match(idRE) === null ) {
        res.status(400);
        res.json(invalidId)
    } else {

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
    }
});


module.exports = {
    router: router
};