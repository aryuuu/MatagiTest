const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.get('/users', (req, res) => {
  User.query()
      .then(users => {
          res.json(users)
      })
});

router.get('/users:id', (req, res) => {
    let id = req.params.id;
    User.query()
        .where('IndonesianId', id)
        .then(users => {
            res.json(users)
        })
});
//
// router.post('/users', (req, res) => {
//     User.query()
//         .then(users => {
//             res.json(users)
//         })
// });
//
// router.put('/users', (req, res) => {
//     User.query()
//         .then(users => {
//             res.json(users)
//         })
// });
//
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