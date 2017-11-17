/**
 * Created by Roc on 2017/11/16.
 * desc:核心主题，无论白天夜晚都适用
 */
import dark from './dark';
import light from './light';


const THEME_MODE = 'light';//todo: 根据本地持久化的主题模式来替代该变量

module.exports = {
    THEME: THEME_MODE === 'light' ? light : dark,

    DRAWER_BG_COLOR: '#232a32',
    DRAWER_BG_SELECTED_COLOR: '#1B222A',
    DRAWER_FONT_COLOR: 'rgba(255,255,255,0.6)',

};
