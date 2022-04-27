import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import Home from './components/home/index';
import Record from './components/record/index';
import Plogging from './components/plogging/index';
import Chat from './components/chat/index';
import MyPage from './components/my/index';

const Stack = createStackNavigator();
const MainScreenTab = createBottomTabNavigator();

const AppTabComponent = () => {
    return (
        <MainScreenTab.Navigator>
            <MainScreenTab.Screen name="홈" component={Home} />
            <MainScreenTab.Screen name="기록" component={Record} />
            <MainScreenTab.Screen name="플로깅" component={Plogging} />
            <MainScreenTab.Screen name="채팅" component={Chat} />
            <MainScreenTab.Screen name="MY" component={MyPage} />
        </MainScreenTab.Navigator>
    )
}

export const RootNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="M" component={AppTabComponent} Screen={{ Headers }} />
        </Stack.Navigator>
    )
}