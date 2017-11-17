/**
 * Created by Roc on 2017/11/16.
 * desc:
 */

import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import * as core from '../../themes/core';

export default class DrawerItem extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        leftIcon: PropTypes.string,
        rightIcon: PropTypes.string.isRequired,
        onTap: PropTypes.func,
        isSelected: PropTypes.bool,
    };

    render() {
        const { leftIcon, title, rightIcon, onTap, isSelected } = this.props;
        const selectedStyle = isSelected && { backgroundColor: core.DRAWER_BG_SELECTED_COLOR };
        return <TouchableOpacity onPress={onTap} style={[styles.container, selectedStyle]}>
            <View style={styles.left}>
                {leftIcon && <Icon style={styles.icon} name={leftIcon} size={20} color={core.DRAWER_FONT_COLOR}/>}
                <Text style={styles.title}>{title}</Text>
            </View>
            <Icon name={rightIcon} size={20} color={core.DRAWER_FONT_COLOR}/>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 15,
        paddingVertical: 15
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: core.DRAWER_FONT_COLOR,
        fontSize: 16,
    },
    icon: {
        marginRight: 10
    }
});