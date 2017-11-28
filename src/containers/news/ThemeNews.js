/**
 * Created by Roc on 2017/11/27.
 * desc:
 */
import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavBar from '../../components/widgets/NavBar';
import { inject, observer } from 'mobx-react';
import * as core from '../../themes/core';
import XFlatList from '../../components/widgets/XFlatList';
import NewsItem from '../../components/vendors/NewsItem';

@inject('themeStore')
@observer
export default class ThemeNews extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        this._onInitData = this._onInitData.bind(this);
        this._onPage = this._onPage.bind(this);
    }

    componentDidMount() {
        const { theme, themeStore } = this.props;
        themeStore.getThemeNews(theme.id);
    }

    _onInitData() {
        const { theme, themeStore } = this.props;
        themeStore.getThemeNews(theme.id);
    }

    render() {
        const { theme, themeStore, paging } = this.props;
        return (
            <View style={styles.container}>
                <NavBar bgColor={core.BLUE} title={theme.name} iconSize={28}
                        leftIcon={'angle-left'} leftPress={Actions.pop}/>
                <XFlatList data={themeStore.themeNews}
                           refreshing={false} onScroll={this._handleScroll} paging={paging} onRefresh={this._onInitData}
                           renderItem={this._renderRow} onPage={this._onPage}/>
            </View>
        );
    }

    _renderRow(data) {
        const row = data.item;
        const img = row.images ? { uri: row.images[0] } : null;
        return <NewsItem onTap={() => Actions.newsDetail({ newsId: row.id, hasHeader: false })} title={row.title}
                         cover={img}/>
    }

    _onPage() {

    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});