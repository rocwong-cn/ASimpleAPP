/* @flow */

import axios from 'axios';
import { observable } from 'mobx';
import { Alert } from 'react-native';
import * as api from '../constants/api';

const ERR_MSG = 'emmmm...服务器被小怪兽吃掉了...';

export default class ThemeStore {
    @observable galleryLoading = false;
    @observable galleryPaging = false;
    @observable gallery = [];
    @observable pageNo = 1;

    async getGallery(pageNo) {
        if (pageNo === 1) {
            this.galleryPaging = true;
        } else {
            this.galleryLoading = true;
        }
        try {
            const server = api.API_IMAGES + `${pageNo}`;
            console.log('server=>', server);
            const response = await axios.get(server);
            if (pageNo === 1) {
                this.galleryPaging = false;
            } else {
                this.galleryLoading = false;
            }
            const finalList = response.data.error ? [] : response.data.results;
            this.gallery = this.gallery.concat(finalList);
            this.pageNo = pageNo + 1;
            return { pageNo: pageNo + 1, list: response.data.results };
        } catch (e) {
            console.log(e);
            if (pageNo === 1) {
                this.galleryPaging = false;
            } else {
                this.galleryLoading = false;
            }
            Alert.alert('连接异常', ERR_MSG);
        }
    }
}
