const express = require('express');
const knex = require('knex');
const router = express.Router();
const User = require('../../models/User');

// REGEX
// match name, only match alphabet, apostrophe, and dash
const nameRE = /^[a-z'][a-z\s'-.]+[a-z.]$/i;

// referensi https://id.wikipedia.org/wiki/Nomor_Induk_Kependudukan
const idRE = new RegExp([
    '^([1-9]{2})', // match kode provinsi
    '([1-9][0-9]|0[1-9]){2}', // match kode kota dan kecamatan
    '(([0-246][0-9])|([37][01]))', // match tanggal lahir
    '(0[1-9]|1[0-2])', // match bulan lahir
    '([0-9]{2})', // match tahun lahir
    '([0-9]{4})$' // match nomor urut
].join(''));

// messages
const invalidName = {"message":"Invalid name"};
const invalidId = {"message": "Invalid ID"};
const notFound = {"message": "no user found"};



router.put('/users', (req, res) => {
    let { Name, IndonesianId, Birthday } = req.body;
    console.log(req.body);

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
        } else if ( IndonesianId.match(idre) === null ) {
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
                                console.log("user added")
                                res.json({"message": "user added successfully"})
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    } else {
                        User.query()
                            .update({
                                Name: Name,
                                IndonesianId: IndonesianId,
                                Birthday: Birthday,
                                updatedAt: knex.raw("CURRENT_TIMESTAMP")
                            })
                            .where({
                                IndonesianId: IndonesianId,
                                deletedAt: '0000-00-00 00:00:00'
                            })
                            .then(() => {
                                res.json({"message": "user updated successfully"})
                            })
                            .catch(err => {
                                console.log(err)
                            })
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