/**
 * Created by Roc on 2017/11/21.
 * desc:
 */
import React from 'react';
import { View, StyleSheet, Image, ScrollView, Text, WebView, ImageBackground } from 'react-native';
import { observer, inject } from 'mobx-react';
import * as core from '../../utils/coreUtil';
import IconButton from '../../components/widgets/IconButton';
import { Actions } from 'react-native-router-flux';


@inject('themeStore')
@observer
export default class NewsDetail extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        this._onMessage = this._onMessage.bind(this);
    }

    componentDidMount() {
        const { themeStore, newsId } = this.props;
        themeStore.getNewsDetail(newsId);
    }

    render() {
        const { themeStore } = this.props;
        const css = themeStore.newsDetail.css ? themeStore.newsDetail.css[0] : '';
        let html = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="'
            + css + '" /></head><body>' + themeStore.newsDetail.body +
            '</body></html>';
        html = html.replace('<script type=“text/javascript”>window.daily=true</script>', '<script type="text/javascript">function waitForBridge() {if (window.postMessage.length !== 1){setTimeout(waitForBridge, 200);}else {window.postMessage(window.scrollY+"")}} window.onload = waitForBridge; window.onscroll = function () { window.postMessage(window.scrollY+"")}</script>');
        return <View style={styles.container}>
            <ImageBackground
                style={{ height: 220, width: core.size.width, position: 'absolute', top: 0, left: 0, zIndex: 99 }}
                source={{ uri: themeStore.newsDetail.image }}>
                {this._renderHeader(themeStore.newsDetail)}
            </ImageBackground>
            <WebView
                automaticallyAdjustContentInsets={true}
                style={styles.webView}
                source={{ html: html }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                scalesPageToFit={false}
                onMessage={this._onMessage}
            />
            {this._renderToolBar()}
        </View>
    }

    _renderHeader(detail) {
        return <View style={styles.header}>
            <Text style={styles.title}>{detail.title}</Text>
            <Text style={styles.source}>{detail.image_source || ''}</Text>
        </View>
    }

    _renderToolBar(){
        return <View style={styles.toolbar}>
            <IconButton icon={'angle-left'} onTap={Actions.pop}/>
            <IconButton icon={'angle-down'} />
            <IconButton icon={'thumbs-o-up'} />
            <IconButton icon={'share-square-o'} />
            <IconButton icon={'commenting-o'} />
        </View>
    }

    _onMessage(event) {
        console.log('event==>', event.nativeEvent.data);
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 35,
        paddingHorizontal: 10
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff',
        backgroundColor: 'transparent',
    },
    source: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        backgroundColor: 'transparent',
        color: 'rgba(255,255,255,0.6)',
    },
    webView: {
        height: 350,
    },
    toolbar:{
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:'#fff',
        height:50,
        borderTopColor:'#e7e7e7',
        borderTopWidth:StyleSheet.hairlineWidth
    }
});