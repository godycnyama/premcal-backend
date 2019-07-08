'use strict';
const PremiumController = require('./premiumController');

const plugin = {  
    register: (server, options) => {
        server.route([{
            method: 'GET',
            path: '/getPremiumCalculationsHistory',
            options: PremiumController.getPremiumCalculationsHistory,
        },
        {
            method: 'POST',
            path: '/calculatePremium',
            options: PremiumController.calculatePremium,
        },
        {
            method: 'DELETE',
            path: '/deletePremiumCalculationRecord/{recordID}',
            options: PremiumController.deletePremiumCalculationRecord,
        }]);
    },
    name: 'premium-plugin',
    version: '1.0.0'
  };
module.exports = plugin;