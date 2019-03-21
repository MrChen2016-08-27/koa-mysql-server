const config = require('../config');
const store = require('./redis');
const redis = require('redis');
const tokenApi = require('../api/token');
const qs = require('querystring');
let timer = null;

// 获取第三方token, 如果获取异常会循环获取
const getToken = async () => {
    try{
        const res = await tokenApi.getToken();
        const data = res.data;
        const admin = {
            token: data.Token,
            uid: data.Uid,
            userName: data.UserName
        }
        // 保存至redis
        store.set('admin', JSON.stringify(admin), redis.print);
        return;
    } catch (err) {
        console.log(err);
        getToken();
    }
};

const tokenTime = (time) => {
    clearInterval(timer);
    timer = setInterval(() => {
        getToken();
    }, time);
};

getToken();
tokenTime(1000 * 60 * 58);