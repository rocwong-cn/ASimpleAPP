/**
 * Created by Roc on 2017/11/3.
 */

import React, { Component } from 'react';
import { ActivityIndicator, ListView, RefreshControl, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

export default class XListView extends Component {
    // 构造
    constructor(props) {
        super(props);
    }

    static propTypes = {
        dataSource: PropTypes.any.isRequired,
        contentContainerStyle: PropTypes.any,
        renderRow: PropTypes.func.isRequired,
        refreshing: PropTypes.bool.isRequired,//是否显示下拉刷新指示器
        paging: PropTypes.bool,//是否显示加载更多指示器
        noMore: PropTypes.bool,//没有更多
        onPage: PropTypes.func,//翻页函数
        onRefresh: PropTypes.func,//下拉刷新函数
        onScroll: PropTypes.func,
    };

    render() {
        const { dataSource, renderRow, onPage, refreshing, onRefresh, onScroll, contentContainerStyle } = this.props;
        let view;

        if (!refreshing && dataSource.getRowCount() === 0) {
            view =
                <TouchableOpacity
                    style={styles.noDataView}
                    transparent
                    onPress={onRefresh}>
                    <Text style={styles.noDataTxt}>暂无记录</Text>
                </TouchableOpacity>;
        } else {
            let refreshCtrl = this._renderRefreshCtrl();
            view = <ListView
                contentContainerStyle={contentContainerStyle}
                dataSource={dataSource}
                renderRow={renderRow}
                enableEmptySections={true}
                onScroll={onScroll}
                onEndReached={onPage}
                onEndReachedThreshold={10}
                renderFooter={this._renderFooter.bind(this)}
                refreshControl={refreshCtrl}
                removeClippedSubviews={false}
            />
        }
        return (view)
    }

    _renderRefreshCtrl() {
        const { onRefresh, refreshing } = this.props;
        if (onRefresh) {
            return <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#666"
                title="加载中..."
                titleColor="#666"
                progressBackgroundColor="transparent"
                colors={['#666', '#666', '#666']}
            />;
        }
        return null;
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
    noMore: { color: '#646464' }
});