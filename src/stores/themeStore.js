/* @flow */

import axios from 'axios';
import { observable } from 'mobx';
import { Alert } from 'react-native';
import { API_THEMES } from '../constants/api';

export default class SearchStore {
    @observable themes = [];

    async getThemeList() {
        try {
            const response = await axios.get(API_THEMES);
            this.themes = response.data.others;
        } catch (e) {
            Alert.alert('连接异常', 'emmmm...服务器被小怪兽吃掉了...');
        }
    }
}
