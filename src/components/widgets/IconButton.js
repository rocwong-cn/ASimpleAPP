/**
 * Created by Roc on 2017/11/17.
 * desc:
 */

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import * as core from '../../themes/core';
import * as coreUtil from '../../utils/coreUtil';

const W = coreUtil.size.width / 5 * 0.55;
export default class IconButton extends Component {
    static propTypes = {
        icon: PropTypes.string,
        badge: PropTypes.number,
        onTap: PropTypes.func,
    };

    render() {
        const { icon, onTap, badge } = this.props;
        return <TouchableOpacity style={styles.button} onPress={onTap}>
            <Icon name={icon} style={{ backgroundColor: 'transparent' }} size={20} color={'#999'}/>
            {badge || badge === 0 ? <View style={styles.badge}>
                <Text style={styles.badgeTxt}>{badge}</Text>
            </View> : null}
        </TouchableOpacity>
    }
}
const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: core.BLUE,
        position: 'absolute',
        left: W,
        top: 10
    },
    badgeTxt: {
        color: '#fff',
        fontSize: 10,
        paddingHorizontal: 3,
    }
});