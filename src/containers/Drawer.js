import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import * as core from '../themes/core';
import DrawerItem from '../components/vendors/DrawerItem';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

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

    componentDidMount() {
        this.props.themeStore.getThemeList();
    }

    render() {
        const themes = this.props.themeStore.themes;
        const sortedThemes = _.sortBy(themes, ['id']);
        const { selectedItem } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.slogon}>🎈 A Simple APP .</Text>
                <ScrollView>
                    <DrawerItem title={'首页'} isSelected={'home' === selectedItem} onTap={this._toHome}
                                rightIcon={'angle-right'} leftIcon={'home'}/>
                    {sortedThemes.map((item, i) => {
                        return <DrawerItem key={i} isSelected={item.id === selectedItem} title={item.name}
                                           rightIcon={'angle-right'} onTap={this._toOther.bind(this, item.id)}/>
                    })}
                </ScrollView>
                <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
                    <TouchableOpacity style={styles.button}>
                        <Icon name="download" size={20} color={core.DRAWER_FONT_COLOR}/>
                        <Text style={styles.txt}>下载</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Icon name="moon-o" size={20} color={core.DRAWER_FONT_COLOR}/>
                        <Text style={styles.txt}>夜间</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _toHome = () => {
        this.setState({ selectedItem: 'home' });
        Actions.home();
    };

    _toOther(id) {
        this.setState({ selectedItem: id });

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
