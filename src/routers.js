/**
 * Created by Roc on 2017/11/16.
 * desc:
 */
import React from 'react';
import { Drawer, Reducer, Router, Scene, Stack } from 'react-native-router-flux';
import Home from './containers/home/index';
import NewsDetail from './containers/home/NewsDetail';
import DrawerContent from './containers/Drawer';
import { size } from './utils/coreUtil';


const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        console.log('ACTION:', action);
        return defaultReducer(state, action);
    };
};

const getSceneStyle = () => ({
    backgroundColor: '#f5f5f5',
    shadowOpacity: 1,
    shadowRadius: 3,
});
const DRAWER_WIDTH = size.width * 0.5 + 50;
const Routers = () => (
    <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
        <Stack hideNavBar key="root" titleStyle={{ alignSelf: 'center' }}>
            <Drawer key="drawer" contentComponent={DrawerContent} drawerWidth={DRAWER_WIDTH}>
                <Scene hideNavBar key="home" component={Home}/>
                <Scene hideNavBar key="newsDetail"  component={NewsDetail}/>
            </Drawer>
        </Stack>
    </Router>
);

export default Routers;
