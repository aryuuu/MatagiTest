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