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
};