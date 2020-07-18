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
    formatStatus(type,value) { //转换品类状态
        let params = {
            'is_best':{
                0:'否',
                1:'是'
            },
            'is_hot':{
                0:'否',
                1:'是'
            },
            'is_new':{
                0:'否',
                1:'是'
            }
        }
        return params[type][value];
    }
}