const store = require('./redis');

exports.get = (key) => {
    return new Promise((resolve, reject) => {
        store.get(key, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}

exports.delete = (keys) => {
    return new Promise((resolve, reject) => {
        store.del(keys, function (err) {
            if (!err) {
                resolve();
            } else {
                reject(err);
            }
        })
    })
}

exports.set = (key, value, seconds) => {
    return new Promise((resolve, reject) => {
        store.set(key, value, 'EX', seconds, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}