/**
 * Created by Roc on 2017/11/16.
 * desc:
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux';
import Home from '../containers/home';
import DrawerContent from './DrawerContent';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuIcon from '../images/menu_burger.png';
import { size } from '../utils/coreUtil';


const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        console.log('ACTION:', action);
        return defaultReducer(state, action);
    };
};

const getSceneStyle = () => ({
    backgroundColor: '#F5FCFF',
    shadowOpacity: 1,
    shadowRadius: 3,
});
const DRAWER_WIDTH = size.width * 0.5 + 50;
const Routers = () => (
    <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
        <Stack hideNavBar key="root" titleStyle={{ alignSelf: 'center' }}>
            <Drawer key="drawer" contentComponent={DrawerContent}
                    drawerIcon={<Icon name="bars" size={20} color="#000"/>}
                    drawerWidth={DRAWER_WIDTH}>
                <Scene key="home" component={Home} title="Home"/>
            </Drawer>
        </Stack>
    </Router>
);

export default Routers;
