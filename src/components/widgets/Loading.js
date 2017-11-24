/**
 * Created by Roc on 2017/3/9.
 */
import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

const SIZES = ['small', 'large'];

export default class Loading extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShow: true
        };
    }

    static propTypes = {
        visible: PropTypes.bool,
        textColor: PropTypes.string,
        size: PropTypes.oneOf(SIZES),
        msg: PropTypes.string,
        cancelable: PropTypes.bool
    };

    static defaultProps = {
        visible: false,
        textColor: 'white',
        size: 'large',
        msg: '加载中...',
    };

    render() {
        if (!this.state.isShow)return null;
        if (!this.props.visible) {
            return null;
        }
        const { visible, size, msg, textColor } = this.props;
        return (
            <TouchableOpacity style={styles.container} activeOpacity={1} onPress={this._onHide.bind(this)}>
                {visible ? <View style={styles.background}>
                    <View style={styles.loading}>
                        <ActivityIndicator animating={true} size={size || 'large'} color="#fff"/>
                        <Text style={[styles.loadingText, { color: textColor }]}>{msg}</Text>
                    </View>
                </View> : <View/>}
            </TouchableOpacity>
        )
    }

    _onHide() {
        if (this.props.cancelable) {
            this.setState({ isShow: false });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99999
    },
    background: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width / 2.5,
        height: Dimensions.get('window').width / 2.5,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    loadingText: {
        marginTop: 10,
        textAlign: 'center',
        color: '#fcfcfc'
    },
    gif: {
        resizeMode: 'contain',
        width: 50,
        height: 50
    }
});