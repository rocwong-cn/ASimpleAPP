/**
 * Created by Roc on 2017/11/17.
 * desc:
 */

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import * as core from '../../themes/core';
import * as coreUtil from '../../utils/coreUtil';

const W = coreUtil.size.width / 5 * 0.55;
export default class Label extends Component {
    static propTypes = {
        txt: PropTypes.string,
        onTap: PropTypes.func,
    };

    render() {
        const { txt, onTap } = this.props;
        return <TouchableOpacity style={styles.button} onPress={onTap}>
            <Text style={styles.badge}>{txt}</Text>
        </TouchableOpacity>
    }
}
const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#999',
        borderWidth: StyleSheet.hairlineWidth,
        margin:5,
    },
    badge: {
        color: '#f9f9f9',
        padding: 10,
    },
});