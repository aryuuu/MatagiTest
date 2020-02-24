const express = require('express');
const knex = require('knex');
const router = express.Router();
const User = require('../../models/User');

const { nameRE, idRE, invalidId, invalidName, notFound } = require('./const');



router.delete('/users/:id', (req, res) => {
    let IndonesianId = req.params.id;

    if ( IndonesianId.match(idRE) !== null ) {
        User.query()
        .where("IndonesianId", IndonesianId)
        .then(users => {
            if ( users.length === 0 ) {
                res.status(400);
                res.json({"message": "user does not exist"})
            } else {
                User.query()
                    .update({
                        deletedAt: knex.raw('CURRENT_TIMESTAMP')
                    })
                    .where('IndonesianId', IndonesianId)
                    .then(() => {
                        res.json({"message": "user deleted successfully"})
                    })
            }
        })
        .catch(err => {
            console.log(err)
        })
    } else {
        res.status(400);
        res.json(invalidId)
    }
});


module.exports = {
    router: router
};