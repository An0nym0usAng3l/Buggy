const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const xhub = require('express-x-hub');
require("dotenv").config()
const token = process.env.TOKEN || 'token';
const port = process.env.PORT || 2020
const v1 = require('./routes/v1')

app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));
app.use(bodyParser.json());

app.use('/v1', v1)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});