/**
 * Created by Roc on 2017/10/26.
 */
import React, { Component } from 'react';
import {
    View,
    Modal,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as WeChat from 'react-native-wechat';
import { toastShort } from './Toast';
import  PropTypes  from 'prop-types';

export default class Share extends Component {
    static propTypes = {
        modal: PropTypes.bool,
        visible: PropTypes.bool,
        onHide: PropTypes.func,
        data: PropTypes.object
    };

    render() {
        const { modal } = this.props;
        if (modal) {
            return this._buildPanelInModal();
        } else {
            return this._buildPanel();
        }
    }

    /**
     * 模态分享组件
     * @private
     */
    _buildPanelInModal() {
        const { visible, onHide, style } = this.props;
        return (
            <View style={style}>
                <Modal onRequestClose={() => {
                    console.log('modal closed')
                }} transparent={true} animationType="slide" visible={visible}>
                    <TouchableWithoutFeedback onPress={this._backdropDismiss.bind(this)}>
                        <View style={styles.backdrop}/>
                    </TouchableWithoutFeedback>
                    <View style={styles.sharePanel}>
                        <View style={styles.title}>
                            <Text style={{ color: '#fff' }}>分享这篇内容</Text>
                            <TouchableOpacity onPress={onHide} style={{ position: 'absolute', right: 10, top: 0 }}>
                                <Icon name="ios-close" style={{ color: '#fff' }} size={30}/>
                            </TouchableOpacity>
                        </View>
                        {this._buildPanel()}
                    </View>
                </Modal>
            </View>
        )
    }

    /**
     * 普通分享组件
     * @private
     */
    _buildPanel() {
        const { visible, showText, style, data } = this.props;
        if (visible) {
            return (
                <View style={[style, styles.body]}>
                    <ShareItem showText={showText} data={data} platform="weixin"/>
                    <ShareItem showText={showText} data={data} platform="fc"/>
                </View>
            )
        } else {
            return null;
        }
    }

    _backdropDismiss() {
        const { onHide } = this.props;
        onHide && onHide();
    }
}

/**
 *  单个分享按钮
 */
class ShareItem extends Component {
    render() {
        const { showText, radioBox } = this.props;
        let icon = this._buildIcon();
        let text;
        if (showText) {
            text = this._buildText();
        }
        if (radioBox) {

        }
        return (
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                              onPress={this._shareTo.bind(this)}>
                <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={icon}/>
                {text}
            </TouchableOpacity>
        )
    }

    _buildIcon() {
        const { platform } = this.props;
        let icon;
        switch (platform) {
            case 'weixin':
                icon = require('../../images/share-weixin.png');
                break;
            case 'fc':
                icon = require('../../images/share-fc.png');
                break;
            default:
                break;
        }
        return icon;
    }

    _buildText() {
        const { platform } = this.props;
        let text;
        switch (platform) {
            case 'weixin':
                text = '微信';
                break;
            case 'fc':
                text = '朋友圈';
                break;
            default:
                break;
        }
        return <Text style={styles.text}>{text}</Text>;
    }


    async _shareTo() {
        const { platform, onHide, data } = this.props;
        try {
            let result = await ShareUtil.shareTo(platform, data);
            onHide && onHide();
        } catch (err) {
            toastShort('分享失败');
        }
    }
}

export class ShareUtil {
    static shareTo(platform, data) {
        switch (platform) {
            case 'weixin':
                return this._shareToWX(data);
                break;
            case 'fc':
                return this._shareToFC(data);
                break;
            default:
                break;
        }
    }

    static _shareToWX(data) {
        return WeChat.shareToSession(data);
    }

    static _shareToFC(data) {
        return WeChat.shareToTimeline(data);
    }
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1
    },
    sharePanel: {
        height: 120,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    title: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8
    },
    body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        marginTop: 3
    }
});