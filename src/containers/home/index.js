import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, } from "react-native";
import { Actions } from 'react-native-router-flux';
import NavBar from '../../components/widgets/NavBar';
import { observer, inject } from 'mobx-react';
import Carousel from '../../components/widgets/Carousel';
import core from '../../utils/coreUtil';


@inject('themeStore')
@observer
export default class extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentDidMount() {
        this.props.themeStore.getLatestNews();
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar leftIcon={'bars'} leftPress={Actions.drawerOpen} title={'首页'}/>
                <ScrollView>
                    {this._renderCarousel()}
                </ScrollView>
            </View>
        );
    }

    _renderCarousel() {
        const { themeStore } = this.props;
        return <Carousel
            delay={3000}
            style={styles.topImg}
            bulletStyle={styles.bulletStyle}
            chosenBulletStyle={[styles.bulletStyle, { backgroundColor: '#fff' }]}
            autoplay={true}
            bullets={true}
            onAnimateNextPage={(p) => console.log(p)}>
            {themeStore.topNews.map((item, i) => {
                return <TouchableOpacity key={i} activeOpacity={0.9}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Image style={styles.topImg} source={{ uri: item.image }}/>
                </TouchableOpacity>;
            })}
        </Carousel>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topImg: {
        width: core.size.width,
        height: 240
    },
    bulletStyle: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 5
    },
    title: {
        position: 'absolute',
        bottom: 35,
        left: 0,
        right: 0,
        color: '#fff',
        zIndex: 999,
        backgroundColor: 'transparent',
        flexWrap: 'wrap',
        fontSize: 20,
        fontWeight: '500',
        paddingHorizontal:20,
        lineHeight:22

    }
});