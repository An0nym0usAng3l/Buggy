const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Home route for Buggy bot v1')
})

router.get('/whatsapp-bot', function (req, res) {
    if (
        req.query['hub.mode'] == 'subscribe' &&
        req.query['hub.verify_token'] == token
    ) {
        res.send(req.query['hub.challenge']);
    } else {
        res.sendStatus(400);
    }
});

router.post('/whatsapp-bot', async (req, res) => {
    const body = req.body
    res.sendStatus(200)
});

module.exports = router