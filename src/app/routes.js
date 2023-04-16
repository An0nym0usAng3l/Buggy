/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/**
 * Automatically loads all models and exports them
 */

const fs = require("fs");
const path = require("path");
const { Router } = require("express");

const router = Router();
fs.readdirSync(__dirname)
    .filter((folder) => fs.lstatSync(`${__dirname}/${folder}`).isDirectory())
    .forEach((folder) => {
        const newDir = `${__dirname}/${folder}`;
        fs.readdirSync(newDir)
            .filter((file) => file.indexOf("Route") > -1)
            .forEach((file) => {
                const endpoint = `/${file.split("Route")[0]}`;
                const route = require(path.join(newDir, file));
                router.use(endpoint, route);
            });
    });

module.exports = router;