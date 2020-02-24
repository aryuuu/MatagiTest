#!/usr/bin/node

const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded());

/**
 * endpoints
 */
app.use('/api/v1',
    require('./api/v1/getUser').router,
    require('./api/v1/getUserById').router,
    require('./api/v1/addUser').router,
    require('./api/v1/putUser').router,
    require('./api/v1/patchUser').router,
    require('./api/v1/deleteUser').router,
    );
app.use('/documentation/v1',
    require('./documentation/v1/doc').router);

// app.route('/documentation/v1', (req, res))

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;
