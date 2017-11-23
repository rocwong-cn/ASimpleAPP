/* @flow */

import axios from 'axios';
import { observable } from 'mobx';
import { Alert } from 'react-native';
import * as api from '../constants/api';

const ERR_MSG = 'emmmm...服务器被小怪兽吃掉了...';

export default class ThemeStore {
    @observable themes = [];
    @observable latestNews = [];
    @observable topNews = [];
    @observable beforeNews = [];
    @observable newsDetail = {};

    async getThemeList() {
        try {
            const response = await axios.get(api.API_THEMES);
            this.themes = response.data.others;
        } catch (e) {
            Alert.alert('连接异常', ERR_MSG);
        }
    }

    async getLatestNews() {
        try {
            const response = await axios.get(api.API_NEW_LATEST);
            this.latestNews = response.data.stories;
            this.topNews = response.data.top_stories;
        } catch (e) {
            Alert.alert('连接异常', ERR_MSG);
        }
    }

    async getBeforeNews(date) {
        console.log(date);
        if (!date) {
            this.beforeNews = [];
        } else {
            try {
                const response = await axios.get(api.API_NEW_BEFORE + date);
                this.beforeNews = response.data.stories;
                return response.data;
            } catch (e) {
                console.log(e);
                Alert.alert('连接异常', ERR_MSG);
            }
        }

    }
    async getThemeNews(themeId) {
        console.log(themeId);
        if (!themeId) {
            this.latestNews = [];
        } else {
            try {
                const response = await axios.get(api.API_THEME_NEWS + themeId);
                this.latestNews = response.data.stories;
                return response.data;
            } catch (e) {
                console.log(e);
                Alert.alert('连接异常', ERR_MSG);
            }
        }

    }

    async getNewsDetail(newsId) {
        if (!newsId) {
            this.newsDetail = {};
        } else {
            try {
                const response = await axios.get(api.API_NEW_DETAIL + newsId);
                this.newsDetail = response.data;
                console.log(response.data);
                return response.data;
            } catch (e) {
                console.log(e);
                Alert.alert('连接异常', ERR_MSG);
            }
        }

    }
}
