# Premium Calculator

## Description

This is an application for calculating insurance premiums given a 13 digit South African ID Number.The front-end is based on Angular 8, Angular Material 8 and CovalentUI.The back end is based on Hapi.js v18, a node.js based framework.The database is MongoDB.

## Installation/Setup

Ensure you have Node v8.12.0+,NPM 6+, MongoDB, and Git installed.
To install the app, run the following command: *git clone https://github.com/godycnyama/premcal-backend.git* in the command line.
cd to premcal-backend root and install Node packages by running the following command: *npm install*.
Before you run the application, make sure MongoDB is running on you system first.
To run the application make sure you are in the premcal-backend root then run the following command: node server.js.
The server runs on port 8000.If port 8000 is in use on your system, change the port in the server.js file line number 9.
To access the front-end, navigate to localhost:8000 in your browser.If you changed the port on which the server is running, just type that port number in the browser instead of 8000.

## Running unit tests

Make sure you are in the project root.Run npm test in the command line.
