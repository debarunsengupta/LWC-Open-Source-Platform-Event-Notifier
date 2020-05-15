// Simple Express server setup to serve the build output
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');

const jsforce = require('jsforce');
var conn = new jsforce.Connection();
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(compression());

// eslint-disable-next-line vars-on-top
var result = '';


app.get(
    '/connect',
    function (req, res, next) {
        conn.login(
            process.env.SFDC_USERNAME,
            process.env.SFDC_PASSWORD,
            (err) => {
                if (err) {
                    return console.error('The error is:' + err);
                }

                conn.streaming
                    .topic(process.env.CHANNEL_NAME)
                    .subscribe(function (message) {
                        console.log('The message-->' + JSON.stringify(message));
                        result = message;
                        next();
                    });

                return console.log('Connected');
            }
        );
    },
    function (req, res) {
        res.writeHead(200, {
            Connection: 'keep-alive',
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache'
        });
        res.write('data: {"msg": ' + JSON.stringify(result) + '}\n\n');
        res.end();
    }
);

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;

const DIST_DIR = './dist';

app.use(express.static(DIST_DIR));

app.use('*', (req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () =>
    console.log(`✅  Server started: http://${HOST}:${PORT}`)
);
