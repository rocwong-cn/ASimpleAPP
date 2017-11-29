/**
 * Created by Roc on 2017/11/16.
 * desc:
 */
import React from 'react';
import { Drawer, Reducer, Router, Scene, Stack, Actions, Lightbox } from 'react-native-router-flux';
import DrawerContent from './containers/Drawer';
import Home from './containers/news/index';
import NewsDetail from './containers/news/NewsDetail';
import CommentList from './containers/news/CommentList';
import ThemeNews from './containers/news/ThemeNews';
import Gallery from './containers/gallery';
import ImageLightbox from './components/widgets/Lightbox';
import { size } from './utils/coreUtil';
import { BLUE } from './themes/core';

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        // console.log('ACTION:', action);
        return defaultReducer(state, action);
    };
};

const getSceneStyle = () => ({
    backgroundColor: '#f5f5f5',
});
const DRAWER_WIDTH = size.width * 0.5 + 50;
const Routers = () => (
    <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
        <Lightbox>
            <Stack hideNavBar key="root" titleStyle={{ alignSelf: 'center' }}>
                <Drawer key="drawer" contentComponent={DrawerContent} drawerWidth={DRAWER_WIDTH}>
                    <Scene hideNavBar key="home" component={Home} back/>
                    <Scene hideNavBar key="gallery" component={Gallery} back/>
                </Drawer>
                <Stack key="newsDetail">
                    <Scene hideNavBar key="newsDetail" component={NewsDetail} back/>
                    <Scene backButtonTintColor="#fff" title="" titleStyle={{ color: '#fff' }} onLeft={Actions.pop}
                           navigationBarStyle={{ backgroundColor: BLUE }} key="commentList" component={CommentList}
                           back/>
                </Stack>
                <Stack key="themeNews">
                    <Scene hideNavBar key="themeNews" component={ThemeNews} back/>
                </Stack>
            </Stack>
            <Scene key="lightbox" component={ImageLightbox}/>
        </Lightbox>
    </Router>
);

export default Routers;
