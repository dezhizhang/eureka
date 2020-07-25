const sd = require('silly-datetime');
module.exports = {
    formatTime(params) {
        return sd.format(new Date(params),'YYYY-MM-DD HH:mm')
    },
    formatType(type) { //转换应用类型
        const params = {
            1:'网站',
            2:'APP',
            3:'小程序'
        }
        return params[type];
    },
    formatStatus(type) { //转换品类状态
        let params = {
            '0':'新品',
            '1':'精品',
            '2':'执销'
        }
        return params[type];
    }
}