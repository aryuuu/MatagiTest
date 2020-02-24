const express = require('express');
const knex = require('knex');
const router = express.Router();
const User = require('../../models/User');

const { nameRE, idRE, invalidId, invalidName, notFound } = require('./const')

router.post('/users', (req, res) => {
    let { Name, IndonesianId, Birthday } = req.body;

    // periksa kelengkapan data
    if ( Name === undefined ) {
        res.status(400);
        res.json({"message": "no name specified"})
    } else if ( IndonesianId === undefined ) {
        res.status(400);
        res.json({"message": "no id specified"})
    } else if ( Birthday === undefined ) {
        res.status(400);
        res.json({"message": "no birthday specified"})
    } else { // validasi nama dan id, birthday asumsi valid
        if ( Name.match(nameRE) === null ) {
            res.status(400);
            res.json(invalidName)
        } else if ( IndonesianId.match(idRE) === null ) {
            res.status(400);
            res.json(invalidId)
        } else {
            User.query()
                .where({ // periksa instance dengan id yang sama dan belum 'dihapus'
                    IndonesianId: IndonesianId,
                    deletedAt: '0000-00-00 00:00:00'
                })
                .then(users => {
                    if ( users.length === 0 ) {
                        User.query()
                            .insert({
                                Name: Name,
                                IndonesianId: IndonesianId,
                                Birthday: Birthday
                            })
                            .then(() => {
                                res.json({
                                    message: "success"
                                })
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    } else {
                        res.json({"message": "user already exist"})
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

});


module.exports = {
    router: router
};