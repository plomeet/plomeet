import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
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
        <MainScreenTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === '홈') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === '기록') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === '플로깅') {
                        iconName = focused ? 'alert-circle' : 'alert-circle-outline';
                    } else if (route.name === '채팅 목록') {
                        iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                    } else if (route.name === 'MY') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'gray',
            }}
        >
            <MainScreenTab.Screen name="홈" component={Home} />
            <MainScreenTab.Screen name="기록" component={Record} />
            <MainScreenTab.Screen name="플로깅" component={Plogging} />
            <MainScreenTab.Screen name="채팅 목록" component={Chat} />
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