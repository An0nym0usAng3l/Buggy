// const App = require("./App");
// const MongoManager = require("./database/MongoDBManager");
// const v1 = require('./app/routes')

// let restServer = new App();
// let mongo = new MongoManager()
// mongo.connect()
// restServer.add_route("/v1", v1);
// restServer.start()

/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var xhub = require('express-x-hub');

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));

app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));
app.use(bodyParser.json());

var token = process.env.TOKEN || 'token';
var received_updates = [];

app.get('/', function (req, res) {
    console.log(req);
    res.send('<pre>' + JSON.stringify(received_updates, null, 2) + '</pre>');
});

app.get('/v1/user/whatsapp-bot', function (req, res) {
    if (
        req.query['hub.mode'] == 'subscribe' &&
        req.query['hub.verify_token'] == token
    ) {
        res.send(req.query['hub.challenge']);
    } else {
        res.sendStatus(400);
    }
});

app.post('/v1/user/whatsapp-bot', function (req, res) {
    console.log('Facebook request body:', req.body);

    if (!req.isXHubValid()) {
        console.log('Warning - request header X-Hub-Signature not present or invalid');
        res.sendStatus(401);
        return;
    }

    console.log('request header X-Hub-Signature validated');
    // Process the Facebook updates here
    received_updates.unshift(req.body);
    res.sendStatus(200);
});
app.listen();