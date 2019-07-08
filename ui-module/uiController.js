'use strict';

/** load client folder*/

exports.getUI = {
    auth: false,
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
};
