'use strict';

// had enabled by egg
// exports.static = true;

//ejs
exports.ejs = {
    enable: true,
    package: 'egg-view-ejs',
};

exports.mongo = {
    enable:true,
    package:'egg-mongo-native'
}
