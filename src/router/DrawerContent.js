import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import * as core from '../themes/core';
import DrawerItem from '../components/vendors/DrawerItem';
import type { ThemeStore } from '../types';
import _ from 'lodash';

type Props = {
    themeStore: ThemeStore;
};

@inject('themeStore')
@observer
class DrawerContent extends React.Component {
    props: Props;

    componentDidMount() {
        this.props.themeStore.getThemeList();
    }

    render() {
        const themes = this.props.themeStore.themes;
        const sortedThemes = _.sortBy(themes, ['id']);
        return (
            <View style={styles.container}>
                <Text style={styles.slogon}>🎈 A Simple APP .</Text>
                <ScrollView>
                    <DrawerItem title={'首页'} rightIcon={'angle-right'} leftIcon={'home'}/>
                    {sortedThemes.map((item, i) => {
                        return <DrawerItem key={i} title={item.name} rightIcon={'angle-right'}/>
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        backgroundColor: core.DRAWER_BG_COLOR,
    },
    slogon: {
        color: core.DRAWER_FONT_COLOR,
        textAlign: 'center',
        paddingVertical: 10
    },
    txt: {
        color: core.DRAWER_FONT_COLOR
    }
});

export default DrawerContent;
