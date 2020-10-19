'use strict';

const { Client } = require('ssh2');
const fs = require('fs');

const config = {
    host: process.env.REMOTE_HOST,
    port: process.env.REMOTE_PORT,
    username: process.env.REMOTE_USER,
    privateKey: fs.readFileSync(process.env.REMOTE_KEYFILE)
};

const exec = (command, callback) => {
    const conn = new Client();
    let output;
    conn.on('ready', () => {
        conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                conn.end();
                callback(output);
            }).on('data', (data) => {
                if(data != null) output += data;
            }).stderr.on('data', (data) => {
                if(data != null) output += data;
            });
        });
    }).connect(config);
}

exports.exec = exec;