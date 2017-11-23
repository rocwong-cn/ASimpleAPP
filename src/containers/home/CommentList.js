/**
 * Created by Roc on 2017/11/23.
 * desc:
 */
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
import CommentItem from '../../components/vendors/CommentItem';

@inject('themeStore')
@observer
export default class CommentList extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
    }

    componentDidMount() {
        const {newsId,themeStore}=this.props;
        themeStore.getLongComments(newsId);
        themeStore.getShortComments(newsId);
    }


    render() {
        return <View style={styles.container}>
            <CommentItem/>
        </View>
    }

}

const styles = StyleSheet.create({
    container: { flex: 1 },

});