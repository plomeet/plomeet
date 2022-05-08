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
import OpenMeeting from './components/home/OpenMeeting1';
import OpenMeeting2 from './components/home/OpenMeeting2';
import OpenMeeting3 from './components/home/OpenMeeting3';
import OpenMeeting4 from './components/home/OpenMeeting4';
import OpenMeeting5 from './components/home/OpenMeeting5';
import MeetingDetail from './components/home/MeetingDetail';


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
                    } else if (route.name === '채팅') {
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
            <MainScreenTab.Screen name="홈" component={Home} options={{title: '플로밋!'}} />
            <MainScreenTab.Screen name="기록" component={Record} />
            <MainScreenTab.Screen name="플로깅" component={Plogging} />
            <MainScreenTab.Screen name="채팅" component={Chat} />
            <MainScreenTab.Screen name="MY" component={MyPage} />
        </MainScreenTab.Navigator>
    )
}

export const RootNavigator = () => {
    return (
        // <Stack.Navigator
        // screenOptions={{
        //   headerShown: false
        // }}>
        <Stack.Navigator>
            <Stack.Screen name="M" component={AppTabComponent} options={{headerShown: false}} Screen={{ Headers }} />
            <Stack.Screen name="OpenMeeting" component={OpenMeeting} options={{title: '플로깅 모임 생성(1/5)'}} />
            <Stack.Screen name="OpenMeeting2" component={OpenMeeting2} options={{title: '플로깅 모임 생성(2/5)'}} />
            <Stack.Screen name="OpenMeeting3" component={OpenMeeting3} options={{title: '플로깅 모임 생성(3/5)'}} />
            <Stack.Screen name="OpenMeeting4" component={OpenMeeting4} options={{title: '플로깅 모임 생성(4/5)'}} />
            <Stack.Screen name="OpenMeeting5" component={OpenMeeting5} options={{title: '플로깅 모임 생성(5/5)'}} />
            <Stack.Screen name="MeetingDetail" component={MeetingDetail} options={{title: '모임 상세정보'}} />
        </Stack.Navigator>
    )
}