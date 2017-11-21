/**
 * Created by Roc on 2017/11/21.
 * desc:
 */
import React from 'react';
import { View, StyleSheet, Image, ScrollView, Text } from 'react-native';
import { observer, inject } from 'mobx-react';
import ParallaxView from 'react-native-parallax-view';


@inject('themeStore')
@observer
export default class NewsDetail extends React.Component {

    componentDidMount() {
        const { themeStore, newsId } = this.props;
        themeStore.getNewsDetail(newsId);
    }

    render() {
        const { themeStore } = this.props;
        console.log(themeStore.newsDetail);
        return <ParallaxView
            backgroundSource={{ uri: themeStore.newsDetail.image }}
            windowHeight={200}
            header={this._renderHeader(themeStore.newsDetail)}
            scrollableViewStyle={{ backgroundColor: 'red' }}
        >
            <View>

            </View>
        </ParallaxView>
    }

    _renderHeader(detail) {
        return <View style={styles.header}>
            <Text style={styles.title}>{detail.title}</Text>
            <Text style={styles.source}>{detail.image_source || ''}</Text>
        </View>
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
    }
});