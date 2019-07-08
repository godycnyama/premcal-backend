'use strict';

const Glue = require('@hapi/glue');
const Path = require('path');
const Db = require('./config/db');

const manifest = {
    server: {
        port: 8000,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, './public')
            }
        }
    },
    register: {
        plugins: [
            {
                plugin: require('@hapi/inert')
            },
            {
                plugin: require('good'),
                options: {
                    ops: {
                        interval: 1000
                    },
                    reporters: {
                        console: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{
                                log: '*',
                                response: '*'
                                }]
                            },
                            {
                            module: 'good-console'
                            }, 'stdout'
                        ]
                    }
                }
            },
            {
                plugin: './ui-module'
            },
            {
                plugin: './premium-module',
                routes: {
                    prefix: '/api'
                }
            }
        ],
        options: {
            once: true
        }
    }
};

const options = {
    relativeTo: __dirname
};

const startServer = async () => {
    try {
        const server = await Glue.compose(manifest, options);
        await server.start();
        console.log('Server started on port 8000!');
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();