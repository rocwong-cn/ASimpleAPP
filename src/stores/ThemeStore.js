/* @flow */

import axios from 'axios';
import { observable } from 'mobx';
import { Alert } from 'react-native';
import * as api from '../constants/api';

const ERR_MSG = 'emmmm...服务器被小怪兽吃掉了...';

export default class ThemeStore {

    @observable loading = false;
    @observable homeLoading = false;
    @observable themes = [];
    @observable latestNews = [];
    @observable topNews = [];
    @observable beforeNews = [];
    @observable newsDetail = {};
    @observable storyExtra = {};
    @observable comments = [];

    async getThemeList() {
        this.homeLoading = true;
        try {
            const response = await axios.get(api.API_THEMES);
            this.themes = response.data.others;
            console.log(response.data.others);
            this.homeLoading = false;
        } catch (e) {
            this.homeLoading = false;
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
        this.loading = true;
        if (!newsId) {
            this.newsDetail = {};
            this.loading = false;
        } else {
            try {
                const response = await axios.get(api.API_NEW_DETAIL + newsId);
                this.newsDetail = response.data;
                this.loading = false;
                return response.data;
            } catch (e) {
                this.loading = false;
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

    async getComments(newsId) {
        if (!newsId) {
            this.longComments = [];
            this.shortComments = [];
        } else {
            try {
                const server = api.API_LONG_COMMENTS.replace('NEWSID', newsId);
                const shortServer = api.API_SHORT_COMMENTS.replace('NEWSID', newsId);
                const response = await axios.get(server);
                const shortRes = await axios.get(shortServer);

                const finalList = [];
                finalList.push({ type: 'L', list: response.data.comments });
                finalList.push({ type: 'S', list: shortRes.data.comments });

                this.comments = finalList;
                console.log('finalList', finalList);
            } catch (e) {
                console.log(e);
                Alert.alert('连接异常', ERR_MSG);
            }
        }

    }

    // async getShortComments(newsId) {
    //     this.loading = true;
    //     if (!newsId) {
    //         this.loading = false;
    //         this.shortComments = [];
    //     } else {
    //         try {
    //             const response = await axios.get(api.API_SHORT_COMMENTS.replace('NEWSID', newsId));
    //             this.shortComments = response.data.comments;
    //             console.log('short', response.data);
    //             this.loading = false;
    //             return response.data;
    //         } catch (e) {
    //             this.loading = false;
    //             console.log(e);
    //             Alert.alert('连接异常', ERR_MSG);
    //         }
    //     }
    //
    // }
}
