/**
 * Created by Roc on 2017/11/17.
 * desc:
 */

import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const H = 65;
const W = 50;
export default class NavBar extends Component {
    static propTypes = {
        leftIcon: PropTypes.string,
        title: PropTypes.string,
        rightIcon: PropTypes.string,
        leftPress: PropTypes.func,
        rightPress: PropTypes.func,
        bgColor: PropTypes.string,
    };

    render() {
        const { leftIcon, rightIcon, title, rightPress, leftPress, bgColor } = this.props;
        return <View style={[styles.container, { backgroundColor: bgColor }]}>
            <TouchableOpacity style={styles.button} onPress={leftPress}>
                <Icon name={leftIcon} style={{ backgroundColor: 'transparent' }} size={20} color={'#fff'}/>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.button} onPress={rightPress}>
                {rightIcon &&
                <Icon name={rightIcon} style={{ backgroundColor: 'transparent' }} size={20} color={'#fff'}/>}
            </TouchableOpacity>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        height: H,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999
    },
    button: {
        height: W,
        width: W,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        backgroundColor: 'transparent'
    }
});