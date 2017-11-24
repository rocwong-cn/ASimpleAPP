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
import XFlatList from '../../components/widgets/XFlatList';

@inject('themeStore')
@observer
export default class CommentList extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            longCommentsHeader: props.long_comments + '条长评',
            shortCommentsHeader: props.short_comments + '条短评',
        };

        this._renderItem = this._renderItem.bind(this)
    }

    componentDidMount() {
        const { newsId, themeStore } = this.props;
        themeStore.getComments(newsId);
    }


    render() {
        const { themeStore } = this.props;
        console.log(themeStore.comments)
        return <View style={styles.container}>
            <XFlatList data={themeStore.comments}
                       renderItem={this._renderItem}
                       refreshing={false}/>
        </View>
    }

    _renderItem(data) {
        const row = data.item;

        const { longCommentsHeader, shortCommentsHeader } = this.state;

        let headerTxt = row.type === 'L' ? longCommentsHeader : shortCommentsHeader;
        return <View>
            <View style={styles.headerView}>
                <Text style={styles.header}>{headerTxt}</Text>
            </View>
            {row.list.map((item, i) => {
                return this._renderCell(item, i);
            })}
        </View>
    }

    _renderCell(row, i) {
        const reply_to = row.reply_to || {};

        return <CommentItem key={i} nickname={row.author} avatar={{ uri: row.avatar }}
                            reply={reply_to.author} replyCtn={reply_to.content}
                            likes={row.likes} content={row.content} date={row.time}/>
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
        padding: 15,
        backgroundColor: '#fff',
    },
    headerView: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd'
    }
});