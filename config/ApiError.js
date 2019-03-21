const errorCode = require('../config/errorCode'); 

/* api错误类 */
class ApiError {
    constructor(code, message = '错误') {
        this.code = code || 'internal:unknown_error';
        this.message = errorCode[code] || message;
    }
}

module.exports = ApiError;
