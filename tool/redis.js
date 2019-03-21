const config = require('../config');
const redis = require('redis');

const client = redis.createClient(config.redis.port, config.redis.host);

module.exports = client;