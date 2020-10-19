'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const ssh = require('./ssh');

const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
};

app.use(express.static(path.join(__dirname, 'public')));

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }

    ssh.exec(event.message.text, (result) => {
        const echo = { type: 'text', text: result.trim().replace('undefined', '')};
        return client.replyMessage(event.replyToken, echo);
    });

}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
