/**
 * Created by Roc on 2017/11/16.
 * desc:
 */
import React from 'react';
import { Drawer, Reducer, Router, Scene, Stack } from 'react-native-router-flux';
import DrawerContent from './containers/Drawer';
import Home from './containers/home/index';
import NewsDetail from './containers/home/NewsDetail';
import CommentList from './containers/home/CommentList';
import { size } from './utils/coreUtil';
import { BLUE } from './themes/core';


const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        console.log('ACTION:', action);
        return defaultReducer(state, action);
    };
};

const getSceneStyle = () => ({
    backgroundColor: '#f5f5f5',
});
const DRAWER_WIDTH = size.width * 0.5 + 50;
const Routers = () => (
    <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
        <Stack hideNavBar key="root" titleStyle={{ alignSelf: 'center' }}>
            <Drawer key="drawer" contentComponent={DrawerContent} drawerWidth={DRAWER_WIDTH}>
                <Scene hideNavBar key="home" component={Home} back/>
            </Drawer>
            <Stack  key="newsDetail">
                <Scene hideNavBar key="newsDetail" component={NewsDetail} back/>
                <Scene backButtonTintColor="#fff" title="" titleStyle={{color:'#fff'}} navigationBarStyle={{backgroundColor:BLUE}} key="commentList" component={CommentList} back/>
            </Stack>
        </Stack>
    </Router>
);

export default Routers;
