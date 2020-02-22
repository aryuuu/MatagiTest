#!/usr/bin/node

const express = require("express");
// const parser =require('body-parser');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json(/*{
    type: '*!/!*'
}*/));
app.use(express.urlencoded())

// endpoints
app.use('/api/v1', require('./api/v1/users').router);

// app.route('/documentation/v1', (req, res))

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
