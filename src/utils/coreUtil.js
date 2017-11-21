/**
 * Created by Roc on 2017/11/16.
 * desc:
 */

import { Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

module.exports = {
    size: {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT
    },
    getToday: () => {
        let date = new Date();

        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();

        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;

        return y + '' + m + '' + d + '';
    },
    parseDateCN: (ymd) => {// ymd:20171120
        let y = ymd.toString().slice(0, 4);
        let m = ymd.toString().slice(4, 6);
        m = parseInt(m);
        let d = ymd.toString().slice(6, 8);
        d = parseInt(d);

        let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

        let formatDateStr = y + '/' + m + '/' + d;
        let formatDate = new Date(formatDateStr);
        let weekDay = week[formatDate.getDay()];

        if (y + '' === new Date().getFullYear() + '') {
            return m + '月' + d + '日 ' + weekDay;
        } else {
            return y + '年' + m + '月' + d + '日 ' + weekDay;
        }
    }
};