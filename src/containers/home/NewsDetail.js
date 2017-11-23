/**
 * Created by Roc on 2017/11/21.
 * desc:
 */
import React from 'react';
import { StatusBar, StyleSheet, Text, View, WebView } from 'react-native';
import { inject, observer } from 'mobx-react';
import * as core from '../../utils/coreUtil';
import IconButton from '../../components/widgets/IconButton';
import { Actions } from 'react-native-router-flux';
import ParallaxView from 'react-native-parallax-view';

@inject('themeStore')
@observer
export default class NewsDetail extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            windowHeight: 0,
            statusBarBG: 'transparent'
        };

        this._onMessage = this._onMessage.bind(this);
        this._onScroll = this._onScroll.bind(this);
    }

    componentDidMount() {
        const { themeStore, newsId } = this.props;
        themeStore.getNewsDetail(newsId);
    }

    render() {
        const { themeStore } = this.props;
        const { statusBarBG, windowHeight } = this.state;
        const css = themeStore.newsDetail.css ? themeStore.newsDetail.css[0] : '';
        let html = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="'
            + css + '" /></head><body>' + themeStore.newsDetail.body +
            '</body></html>';

        //替换原有的脚本，新增获取窗口高度的脚本
        html = html.replace('<script type=“text/javascript”>window.daily=true</script>',
            '<script type="text/javascript">window.daily=true;function waitForBridge() {if (window.postMessage.length !== 1){setTimeout(waitForBridge, 200);}else {window.postMessage(document.body.scrollHeight+"")}} window.onload = waitForBridge; </script>');
        html = html.replace('img-place-holder', '');//剔除顶部的图片占位区
        return <View style={styles.container}>
            <View style={[{ backgroundColor: statusBarBG }, styles.statusBar]}/>
            <ParallaxView
                backgroundSource={{ uri: themeStore.newsDetail.image }}
                windowHeight={200}
                header={this._renderHeader(themeStore.newsDetail)} onScroll={this._onScroll}>
                <WebView
                    automaticallyAdjustContentInsets={true}
                    style={{ height: windowHeight }}
                    source={{ html: html }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    scalesPageToFit={false} scrollEnabled={false}
                    onMessage={this._onMessage}
                />
            </ParallaxView>
            {this._renderToolBar()}

        </View>
    }

    _renderHeader(detail) {
        return <View style={styles.header}>
            <Text style={styles.title}>{detail.title}</Text>
            <Text style={styles.source}>{detail.image_source || ''}</Text>
        </View>
    }

    _renderToolBar() {
        return <View style={styles.toolbar}>
            <IconButton icon={'angle-left'} onTap={Actions.pop}/>
            <IconButton icon={'angle-down'}/>
            <IconButton icon={'thumbs-o-up'}/>
            <IconButton icon={'share-square-o'}/>
            <IconButton icon={'commenting-o'}/>
        </View>
    }

    _onMessage(event) {
        if (event.nativeEvent && event.nativeEvent.data) {
            this.setState({ windowHeight: parseFloat(event.nativeEvent.data) });
        } else {
            this.setState({ windowHeight: core.size.height });
        }
    }

    _onScroll(event) {
        let positionY = event.nativeEvent.contentOffset.y;
        if (positionY >= 200) {
            StatusBar.setBarStyle('default', false);
            this.setState({ statusBarBG: '#f9f9f9' });
        } else {
            StatusBar.setBarStyle('light-content', false);
            this.setState({ statusBarBG: 'transparent' });
        }
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
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        height: 50,
        borderTopColor: '#e7e7e7',
        borderTopWidth: StyleSheet.hairlineWidth
    },
    statusBar: {
        height: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        width: core.size.width,
        zIndex: 99
    }
});