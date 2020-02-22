#!/usr/bin/node

const express = require("express");
const port = process.env.PORT || 3000

const app = express()

// endpoints
app.use('/api/v1', require('./api/v1/users').router);

// app.route('/documentation/v1', (req, res))

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
