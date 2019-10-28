const store = require('./redis');

exports.get = (key) => {
    return new Promise((resolve, reject) => {
        store.get(key, (err, data) => {
            let admin = JSON.parse(data);
            if (!err) {
                resolve(admin);
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