const express = require('express');
const knex = require('knex');
const router = express.Router();
const User = require('../../models/User');

const { nameRE, idRE, invalidId, invalidName, notFound } = require('./const');

/**
 * @module patchUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {undefined}
 */

router.patch('/users/:id', (req, res) => {

    let oldId = req.params.id;
    let { Name, IndonesianId, Birthday } = req.body;

    if ( Name !== undefined && Name.match(nameRE) === null ) {
        res.json(invalidName)
    } else if ( IndonesianId !== undefined && IndonesianId.match(idRE) === null ) {
        res.json(invalidId)
    } else {
        User.query()
            .where({
                IndonesianId: oldId,
                deletedAt: '0000-00-00 00:00:00'
            })
            .then(users => {
                if ( users.length !== 0 ) {
                    let user = users[0];
                    User.query()
                        .where({
                            IndonesianId: oldId,
                            deletedAt: '0000-00-00 00:00:00'
                        })
                        .update({
                            Name: Name || user.Name,
                            IndonesianId: IndonesianId || oldId,
                            Birthday: Birthday || user.Birthday,
                            updatedAt: knex.raw("CURRENT_TIMESTAMP")
                        })
                        .then(() => {
                            res.json({"message": "user updated successfully"})
                        })
                } else {
                    res.status(400);
                    res.json({"message": "user doesn't exist"})
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

});

module.exports = {
    router: router
};