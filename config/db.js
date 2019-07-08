'use strict';

const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

  
//Mongoose.connect(database.url);
Mongoose.connect("mongodb://127.0.0.1/premiumdb", { server: { reconnectTries: Number.MAX_VALUE } });
var connection = Mongoose.connection;

connection.on('error', console.error.bind(console, 'Database connection error'));
connection.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

autoIncrement.initialize(connection);
exports.connection = connection;
exports.autoIncrement = autoIncrement;
exports.mongoose = Mongoose;


