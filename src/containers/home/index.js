import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, } from "react-native";
import { Actions } from 'react-native-router-flux';
import NavBar from '../../components/widgets/NavBar';
import { observer, inject } from 'mobx-react';
import Carousel from '../../components/widgets/Carousel';
import * as core from '../../utils/coreUtil';
import NewsItem from '../../components/vendors/NewsItem';
import XFlatList from '../../components/widgets/XFlatList';


@inject('themeStore')
@observer
export default class extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            navBg: 'transparent',
            beforeDay: core.getToday(),
            beforeNews: [],
            canLoad: false,
            paging: false,
            refreshing: false,
        };

        this._renderRow = this._renderRow.bind(this);
        this._onPage = this._onPage.bind(this);
        this._handleScroll = this._handleScroll.bind(this);
        this._onInitData = this._onInitData.bind(this);
    }

    componentDidMount() {
        this._onInitData();
    }

    _onInitData() {
        this.setState({ beforeDay: core.getToday(), beforeNews: [], refreshing: false });
        this.props.themeStore.getLatestNews();

        this.props.themeStore.getBeforeNews(this.state.beforeDay).then(res => {
            this.setState({ beforeNews: res.stories, beforeDay: res.date, refreshing: true });
        });
    }

    render() {
        const { themeStore } = this.props;
        const { navBg, beforeNews, paging } = this.state;
        return (
            <View style={styles.container}>
                <NavBar bgColor={navBg} leftIcon={'bars'} leftPress={Actions.drawerOpen} title={'首页'}/>
                <XFlatList data={themeStore.latestNews.concat(beforeNews)} headerComponent={this._renderCarousel()}
                           refreshing={false} onScroll={this._handleScroll} paging={paging} onRefresh={this._onInitData}
                           renderItem={this._renderRow} onPage={this._onPage}/>
            </View>
        );
    }

    _renderRow(data) {
        const row = data.item;
        return <NewsItem title={row.title} cover={{ uri: row.images[0] }}/>
    }

    _onPage() {
        const { canLoad, beforeNews, beforeDay, paging } = this.state;
        if (beforeNews.length === 0 || paging) {
            return;
        }
        if (canLoad) {
            this.setState({ paging: true });
            setTimeout(() => {
                this.props.themeStore.getBeforeNews(beforeDay).then(res => {
                    this.setState({ beforeNews: beforeNews.concat(res.stories), beforeDay: res.date, paging: false });
                });
            }, 1000);
        }
    }

    _renderCarousel() {
        const { themeStore } = this.props;
        return <Carousel
            delay={3000}
            style={styles.topImg}
            bulletStyle={styles.bulletStyle}
            chosenBulletStyle={[styles.bulletStyle, { backgroundColor: '#fff' }]}
            autoplay={true}
            bullets={true}>
            {themeStore.topNews.map((item, i) => {
                return <TouchableOpacity key={i} activeOpacity={0.9}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Image style={styles.topImg} source={{ uri: item.image }}/>
                </TouchableOpacity>;
            })}
        </Carousel>
    }

    _handleScroll(event) {
        this.setState({ canLoad: true });
        let positionY = event.nativeEvent.contentOffset.y;
        if (positionY > 0) {
            this.setState({ navBg: '#rgba(25,145,212,' + positionY / 80 + ')' });
        } else {
            this.setState({ navBg: 'transparent' });
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topImg: {
        width: core.size.width,
        height: 200
    },
    bulletStyle: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 5
    },
    title: {
        position: 'absolute',
        bottom: 35,
        left: 0,
        right: 0,
        color: '#fff',
        zIndex: 999,
        backgroundColor: 'transparent',
        flexWrap: 'wrap',
        fontSize: 20,
        fontWeight: '500',
        paddingHorizontal: 20,
        lineHeight: 22

    }
});