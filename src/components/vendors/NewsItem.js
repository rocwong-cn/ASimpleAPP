/**
 * Created by Roc on 2017/11/17.
 * desc:
 */

import React, { Component } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as core from '../../themes/core';

export default class NewsItem extends Component {
    static propTypes = {
        cover: PropTypes.object,
        title: PropTypes.string,
        onTap: PropTypes.func,
    };

    render() {
        const { cover, onTap, title } = this.props;
        return <TouchableOpacity onPress={onTap} style={styles.container} activeOpacity={0.9}>
            <Text numberOfLines={4} style={styles.txt}>{title}</Text>
            <Image source={cover} style={styles.cover}/>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        height: 102,
        backgroundColor: core.THEME.BG_COLOR
    },
    cover: {
        width: 100,
        height: 82
    },
    txt: {
        flexWrap: 'wrap',
        flex: 1,
        fontSize: 16,
        lineHeight: 20,
        marginRight: 5,
        fontWeight: '500'
    }
});