const sd = require('silly-datetime');
module.exports = {
    formatTime(params) {
        return sd.format(new Date(params),'YYYY-MM-DD HH:mm')
    },
    formatType(type) {
        const params = {
            1:'网站',
            2:'APP',
            3:'小程序'
        }
        return params[type];
    }
}