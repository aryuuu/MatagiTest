const express = require('express');
const router = express.Router();
const User = require('../../models/User');


// REGEX
// match name, only match alphabet, apostrophe, and dash
const namere = /^[a-z'][a-z\s'-.]+[a-z.]$/i;

// referensi https://id.wikipedia.org/wiki/Nomor_Induk_Kependudukan
const idre = new RegExp([
    '^([1-9]{2})', // match kode provinsi
    '([1-9][0-9]|0[1-9]){2}', // match kode kota dan kecamatan
    '(([0-246][0-9])|([37][01]))', // match tanggal lahir
    '(0[1-9]|1[0-2])', // match bulan lahir
    '([0-9]{2})', // match tahun lahir
    '([0-9]{4})$' // match nomor urut
].join(''));

// messages
const invalidName = {"message":"Invalid name"};
const invalidBirthday = {"message": "Invalid Birthday"};
const invalidId = {"message": "Invalid ID"};
const notFound = {"message": "no user found"};

router.get('/users', (req, res) => {
  User.query()
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

router.get('/users/:id', (req, res) => {
    let id = req.params.id;
    User.query()
        .where('IndonesianId', id)
        .then(users => {
            if (users.length === 0) {
                res.json(notFound)
            } else {
                res.json({
                    message: "success",
                    users: users
                })
            }
        })
});

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
        if ( Name.match(namere) === null ) {
            res.status(400);
            res.json(invalidName)
        } else if ( IndonesianId.match(idre) === null ) {
            res.status(400);
            res.json(invalidId)
        } else {
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
        }
    }

});

// router.put('/users', (req, res) => {
//     let { Name, IndonesianId, Birthday } = req.body;
//
//     // periksa kelengkapan data
//     if ( Name === undefined ) {
//         res.status(400);
//         res.json({"message": "no name specified"})
//     } else if ( IndonesianId === undefined ) {
//         res.status(400);
//         res.json({"message": "no id specified"})
//     } else if ( Birthday === undefined ) {
//         res.status(400);
//         res.json({"message": "no birthday specified"})
//     } else { // validasi nama dan id, birthday asumsi valid
//         if ( Name.match(namere) === null ) {
//             res.status(400);
//             res.json(invalidName)
//         } else if ( IndonesianId.match(idre) === null ) {
//             res.status(400);
//             res.json(invalidId)
//         } else {
//             User.query()
//                 .then(users => {
//                     if ( users.length === 0 ) {
//
//                     }
//                 })
//         }
//     }
//
// });

// router.patch('/users', (req, res) => {
//     User.query()
//         .then(users => {
//             res.json(users)
//         })
// });
//
// router.delete('/users', (req, res) => {
//     User.query()
//         .then(users => {
//             res.json(users)
//         })
// });

module.exports = {
    router: router
};