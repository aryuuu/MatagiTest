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




router.delete('/users/:id', (req, res) => {
    let IndonesianId = req.params.id

    if ( IndonesianId.match(idre) !== null ) {
        User.query()
        .where("IndonesianId", IndonesianId)
        .then(users => {
            if ( users.length === 0 ) {
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
        res.json(invalidId)
    }
});


module.exports = {
    router: router
};