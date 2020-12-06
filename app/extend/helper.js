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
    },
    formatMaintainStatus(type) {
        let params = {
            1:'预约工单',
            2:'处理中',
            3:'处理完',
            4:'待评价',
            5:'己完成'
        }
        return params[type]
    }

}