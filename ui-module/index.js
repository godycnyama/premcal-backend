'use strict';
const UIController = require('./uiController');

const plugin = {  
    register: (server, options) => {
        server.route({
            method: 'GET',
            path: '/{params*}',
            options: UIController.getUI
        });
    },
    name: 'ui-plugin',
    version: '1.0.0'
  };
module.exports = plugin;