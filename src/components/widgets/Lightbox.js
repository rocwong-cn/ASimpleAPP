/**
 * Created by Roc on 2017/11/29.
 * desc:
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ProgressImage from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

export default class ImageLightbox extends Component {
    static propTypes = {
        horizontalPercent: PropTypes.number,
        verticalPercent: PropTypes.number,
    };

    constructor(props) {
        super(props);

        this.state = {
            opacity: new Animated.Value(0),
        };
    }

    componentDidMount() {
        Animated.timing(this.state.opacity, {
            duration: 100,
            toValue: 1,
        }).start();
    }

    closeModal = () => {
        Animated.timing(this.state.opacity, {
            duration: 100,
            toValue: 0,
        }).start(Actions.pop);
    };

    _renderLightBox = () => {
        const { imgSource } = this.props;
        return (
            <TouchableOpacity activeOpacity={1} style={styles.content} onPress={this.closeModal}>
                <ProgressImage indicatorProps={{ color: '#2eb5ee'}} resizeMode="contain" source={imgSource}
                               indicator={ProgressCircle} style={styles.image}/>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <Animated.View style={[styles.container, { opacity: this.state.opacity }]}>
                {this._renderLightBox()}
            </Animated.View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: deviceWidth,
        height: deviceHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: deviceWidth,
        height: deviceHeight
    }
});