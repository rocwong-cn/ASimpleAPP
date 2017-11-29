/**
 * Created by Roc on 2017/4/1.
 */

import React, { PureComponent } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class XFlatList extends PureComponent {
    // 构造
    constructor(props) {
        super(props);
    }

    static propTypes = {
        data: PropTypes.any.isRequired,
        contentContainerStyle: PropTypes.any,
        renderItem: PropTypes.func.isRequired,
        refreshing: PropTypes.bool.isRequired,//是否显示下拉刷新指示器
        paging: PropTypes.bool,//是否显示加载更多指示器
        noMore: PropTypes.bool,//没有更多
        onPage: PropTypes.func,//翻页函数
        onRefresh: PropTypes.func,//下拉刷新函数
        onScroll: PropTypes.func,
        getItemLayout: PropTypes.func,
        headerComponent: PropTypes.any,
        footerComponent: PropTypes.any,
        extra: PropTypes.any
    };

    render() {
        const {
            data, headerComponent, footerComponent,
            extra, onRefresh, refreshing, onPage, renderItem, onScroll,
            getItemLayout
        } = this.props;

        let view;
        if (!refreshing && data.length === 0) {
            view =
                <TouchableOpacity
                    style={styles.noDataView}
                    transparent
                    onPress={onRefresh}>
                    <Text style={styles.noDataTxt}>暂无记录</Text>
                </TouchableOpacity>;
        } else {
            view = <FlatList ListHeaderComponent={headerComponent}
                             ItemSeparatorComponent={this._renderSeparator}
                             extraData={extra}
                             keyExtractor={this._keyExtractor}
                             onRefresh={onRefresh}
                             refreshing={refreshing}
                             onScroll={onScroll}
                             onEndReachedThreshold={0.1}
                             onEndReached={onPage}
                             ListFooterComponent={footerComponent || this._renderFooter()}
                             renderItem={renderItem}
                             getItemLayout={getItemLayout}
                             data={data} {...this.props}/>
        }
        return (view)
    }

    _renderSeparator = () => {
        return <View style={styles.separator}/>
    };

    _keyExtractor(data, index) {
        return index;
    }

    _renderFooter() {
        const { paging, noMore, refreshing } = this.props;
        if (paging) {
            return (<View style={styles.footer}>
                    <ActivityIndicator
                        animating={true}
                        style={{ height: 50 }}
                        size={'small'}/>
                    <Text style={styles.loading}>加载中...</Text>
                </View>
            )
        } else if (noMore && !refreshing) {
            return (<View style={styles.refresh}>
                    <Text style={styles.noMore}>没有更多了 ~</Text>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    noDataView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },
    noDataTxt: { color: '#999' },
    footer: { justifyContent: 'center', alignItems: 'center' },
    loading: { color: '#646464', fontSize: 12 },
    refresh: { justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
    noMore: { color: '#646464' },
    separator: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#ddd' }
});