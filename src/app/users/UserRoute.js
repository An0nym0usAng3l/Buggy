const express = require('express')
const ErrorHandler = require('../../interfaces/errors')
const router = express.Router()
const { verify_webhook, sort_webhook } = require("./UserContollers")

router.route('/')
    .get((req, res) => {
        res.send('Home route for Buggy bot v1')
    })
    .all((req, res) => {
        return ErrorHandler.methodNotAllowed(req, res);
    })

router
    .route('/whatsapp-bot')
    .get((req, res) => {
        return verify_webhook(req, res)
    })
    .post(async (req, res) => {
        return await sort_webhook(req, res)
    })
    .all((req, res) => {
        return ErrorHandler.methodNotAllowed(req, res);
    })

module.exports = router

