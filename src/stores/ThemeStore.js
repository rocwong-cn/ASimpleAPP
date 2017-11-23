/* @flow */

import axios from 'axios';
import { observable } from 'mobx';
import { Alert } from 'react-native';
import * as api from '../constants/api';

const ERR_MSG = 'emmmm...服务器被小怪兽吃掉了...';

export default class ThemeStore {

    @observable loading = false;
    @observable themes = [];
    @observable latestNews = [];
    @observable topNews = [];
    @observable beforeNews = [];
    @observable newsDetail = {};
    @observable storyExtra = {};
    @observable longComments = [];
    @observable shortComments = [];

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
                return response.data;
            } catch (e) {
                console.log(e);
                Alert.alert('连接异常', ERR_MSG);
            }
        }

    }

    async getStoryExtra(newsId) {
        if (!newsId) {
            this.storyExtra = {};
        } else {
            try {
                const response = await axios.get(api.API_STORY_EXTRA + newsId);
                this.storyExtra = response.data;
                console.log(response.data);
                return response.data;
            } catch (e) {
                console.log(e);
                Alert.alert('连接异常', ERR_MSG);
            }
        }

    }

    async getLongComments(newsId) {
        if (!newsId) {
            this.longComments = [];
        } else {
            try {
                const server = api.API_LONG_COMMENTS.replace('NEWSID', newsId);
                console.log(server);
                const response = await axios.get(server);
                this.longComments = response.data;
                console.log(response.data);
                return response.data;
            } catch (e) {
                console.log(e);
                Alert.alert('连接异常', ERR_MSG);
            }
        }

    }

    async getShortComments(newsId) {
        this.loading = true;
        if (!newsId) {
            this.loading = false;
            this.shortComments = [];
        } else {
            try {
                const response = await axios.get(api.API_SHORT_COMMENTS.replace('NEWSID', newsId));
                this.shortComments = response.data;
                console.log(response.data);
                this.loading = false;
                return response.data;
            } catch (e) {
                this.loading = false;
                console.log(e);
                Alert.alert('连接异常', ERR_MSG);
            }
        }

    }
}
