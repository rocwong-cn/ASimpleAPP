/**
 * Created by Roc on 2017/11/29.
 * desc:
 */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavBar from '../../components/widgets/NavBar';
import { inject, observer } from 'mobx-react';
import * as core from '../../utils/coreUtil';
import XFlatList from '../../components/widgets/XFlatList';
import ProgressImage from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';

const IMG_SIZE = core.size.width * 0.5 - 25;

@inject('galleryStore')
@observer
export default class extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            currentPageNo: 1,
        };

    }

    componentDidMount() {
        this._fetchData(1);
    }

    _fetchData(p) {
        const { galleryStore } = this.props;
        galleryStore.getGallery(p).then((res) => {
            this.setState({ currentPageNo: res.pageNo });
        });
    }

    render() {
        const { galleryStore } = this.props;
        const gallery = galleryStore.gallery || [];
        return (
            <View style={styles.container}>
                <NavBar bgColor={'#2eb5ee'} title={'美图'} isFixed={false}
                        leftIcon={'bars'} leftPress={Actions.drawerOpen}/>

                <XFlatList refreshing={galleryStore.galleryLoading}
                           contentContainerStyle={styles.contentContainer}
                           numColumns={2} horizontal={false} ItemSeparatorComponent={null}
                           data={gallery} renderItem={this._renderRow}
                           onRefresh={this._fetchData.bind(this, 1)} onPage={this._onPage}
                />
            </View>
        );
    }

    _renderRow = (data) => {
        const row = data.item;
        return <TouchableOpacity style={styles.cell} activeOpacity={0.8} onPress={this._openLightbox.bind(this, row)}>
            <ProgressImage source={{ uri: row.url + '?imageView2/0/w/' + IMG_SIZE * 2 }} indicator={ProgressCircle}
                           style={styles.image} indicatorProps={{ color: '#2eb5ee' }}/>
            <Text style={styles.uploader}>{row.who}</Text>
        </TouchableOpacity>
    };

    _openLightbox(row) {
        Actions.lightbox({ imgSource: { uri: row.url } });
    }

    _onPage = () => {
        const { galleryStore } = this.props;
        const { currentPageNo } = this.state;
        if (galleryStore.galleryLoading || galleryStore.gallery.length < 20) {
            return;
        }
        this._fetchData(currentPageNo);
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cell: {
        flex: 1,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5
    },
    image: {
        width: IMG_SIZE,
        height: IMG_SIZE
    },
    contentContainer: {
        paddingHorizontal: 5
    },
    uploader: {
        color: '#666',
        marginTop: 5,
        paddingHorizontal: 5
    }
});