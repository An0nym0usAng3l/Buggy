const bodyParser = require('body-parser');
const express = require('express');
require("dotenv").config()


const xhub = require('express-x-hub');
const port = process.env.PORT || 2020

class App {
    constructor() {
        this.app = express()
        this.app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));
        this.app.use(bodyParser.json());
    }

    start() {
        this.app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        });
    }

    add_route(route_name, routes) {
        this.app.use(route_name, routes)
    }
}

module.exports = App;
