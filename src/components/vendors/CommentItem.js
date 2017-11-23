/**
 * Created by Roc on 2017/11/17.
 * desc:
 */

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as core from '../../themes/core';

export default class CommentItem extends Component {
    static propTypes = {
        nickname: PropTypes.string,
        avatar: PropTypes.func,
    };

    render() {
        const { avatar, nickname ,praise,content,reply,replyCtn,date} = this.props;
        return <View style={styles.container}>
            <Image style={styles.avatar} source={avatar}/>
            <View style={styles.rightCtn}>
                <View style={styles.spaceRow}>
                    <Text style={styles.nickname}>{nickname}</Text>
                    <View style={styles.topRow}>
                        <Icon name={'thumbs-up'} color="#999"/>
                        <Text style={styles.praise}>{praise}</Text>
                    </View>
                </View>
                <Text
                    style={styles.content}>{content}</Text>
                <View style={styles.reply}>
                    <Text style={styles.nickname}>//{reply}：<Text style={styles.replyCtn}>{replyCtn}</Text></Text>
                </View>
                <Text style={styles.date}>{date}</Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    spaceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10

    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    nickname: {
        fontSize: 15,
        fontWeight: '500',
    },
    content: {
        color: '#333',
        lineHeight: 18
    },
    date: {
        fontSize: 13,
        color: '#999',
        marginTop: 15
    },
    rightCtn: {
        flex: 1,
        marginLeft: 10
    },
    reply: {
        marginTop: 10
    },
    replyCtn: {
        color: '#999',
        lineHeight: 18,
    },
    praise: {
        fontSize: 13,
        color: '#999',
        marginLeft: 5
    }
});