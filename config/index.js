const path = require('path');

let file;
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    file = path.resolve(__dirname, 'dev.js');
} else {
    file = path.resolve(__dirname, 'prod.js');
}

module.exports = require(file);