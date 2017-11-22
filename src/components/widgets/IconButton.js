/**
 * Created by Roc on 2017/11/17.
 * desc:
 */

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

export default class IconButton extends Component {
    static propTypes = {
        icon: PropTypes.string,
        onTap: PropTypes.func,
    };

    render() {
        const { icon, onTap } = this.props;
        return <TouchableOpacity style={styles.button} onPress={onTap}>
            <Icon name={icon} style={{ backgroundColor: 'transparent' }} size={20} color={'#999'}/>
        </TouchableOpacity>
    }
}
const styles = StyleSheet.create({
    button: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});