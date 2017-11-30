/**
 * Created by Roc on 2017/11/17.
 * desc:
 */

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import light from '../../themes/light';
import ProgressImage from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';

export default class NewsItem extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    static propTypes = {
        themeStyle: PropTypes.object,
        cover: PropTypes.object,
        title: PropTypes.string,
        themeMode: PropTypes.string,
        onTap: PropTypes.func,
    };

    render() {
        const { cover, onTap, title, themeStyle } = this.props;
        const _style = themeStyle || light;
        return <TouchableOpacity onPress={onTap}
                                 style={[styles.container, { backgroundColor: _style.BG_COLOR }]}
                                 activeOpacity={0.9}>
            <Text numberOfLines={4} style={[styles.txt, { color: _style.FONT_COLOR }]}>{title}</Text>
            {cover && <ProgressImage source={cover} indicator={ProgressCircle} resizeMode='contain'
                                     style={styles.cover} indicatorProps={{ color: '#2eb5ee' }}/>}
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        height: 102
    },
    cover: {
        width: 100,
        height: 82,
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