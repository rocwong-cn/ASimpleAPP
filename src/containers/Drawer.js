import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import * as core from '../themes/core';
import DrawerItem from '../components/vendors/DrawerItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import { toastShort } from '../components/widgets/Toast';

@inject('themeStore')
@observer
class DrawerContent extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedItem: 'home'
        };
    }

    render() {
        const { selectedItem } = this.state;
        const { themeStore } = this.props;
        const isDaylight = themeStore.themeMode === 'light';
        console.log('themeStore.themeMode==>', themeStore.themeMode);
        return (
            <View style={styles.container}>
                <Text style={styles.slogon}>🎈 A Simple APP .</Text>
                <View style={{ flex: 1 }}>
                    <DrawerItem title={'首页'} isSelected={'home' === selectedItem} onTap={this._toHome}
                                rightIcon={'angle-right'} leftIcon={'home'}/>
                    <DrawerItem title={'美图'} isSelected={'photo' === selectedItem}
                                onTap={this._toGallery}
                                rightIcon={'angle-right'} leftIcon={'picture-o'}/>
                    {/*<DrawerItem title={'好文'} isSelected={'file' === selectedItem}*/}
                    {/*onTap={this._toOther.bind(this, 'file')}*/}
                    {/*rightIcon={'angle-right'} leftIcon={'file-text-o'}/>*/}
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
                    <TouchableOpacity style={styles.button} onPress={() => toastShort('暂不支持')}>
                        <Icon name="download" size={20} color={core.DRAWER_FONT_COLOR}/>
                        <Text style={styles.txt}>下载</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this._changeMode}>
                        <Icon name={!isDaylight ? 'sun-o' : 'moon-o'} size={20} color={core.DRAWER_FONT_COLOR}/>
                        <Text style={styles.txt}>{!isDaylight ? '白天' : '夜晚'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _toHome = () => {
        this.setState({ selectedItem: 'home' });
        Actions.home();
    };

    _toGallery = () => {
        this.setState({ selectedItem: 'photo' });
        Actions.gallery();
    };

    _toOther(id) {
        this.setState({ selectedItem: id });
    };

    _changeMode = () => {
        this.props.themeStore.changeMode();
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: core.DRAWER_BG_COLOR,
    },
    slogon: {
        color: core.DRAWER_FONT_COLOR,
        textAlign: 'center',
        paddingVertical: 10
    },
    txt: {
        color: core.DRAWER_FONT_COLOR
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});

export default DrawerContent;
