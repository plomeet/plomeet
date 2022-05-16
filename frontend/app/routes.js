import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux"
//Screens
import Splash from './components/auth/Splash';
import SignUp from './components/auth/SignUp';
import NicknameRegister from './components/auth/NicknameRegister';
import Home from './components/home/index';
import RecordContainer from './container/LogContainer';
import Plogging from './container/PloggingContainer';
import Chat from './components/chat/index';
import MyPage from './components/my/index';
import OpenMeeting from './components/home/OpenMeeting1';
import OpenMeeting2 from './components/home/OpenMeeting2';
import OpenMeeting3 from './components/home/OpenMeeting3';
import OpenMeeting4 from './components/home/OpenMeeting4';
import OpenMeeting5 from './components/home/OpenMeeting5';
import MeetingDetail from './components/home/MeetingDetail';
import CameraPage from './components/plogging/button/CameraPage';
import LogDetail from './components/record/plogDetail/index';

//Chatting
import InsideRoom from './components/chat/room/inside_room';

//My
import BadgeList from './components/my/badge/badge_all';


const Stack = createStackNavigator();
const MainScreenTab = createBottomTabNavigator();


const AppTabComponent = () => {
    const navigation = useNavigation();

    return (
        <MainScreenTab.Navigator

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === '홈') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === '기록') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === '채팅 목록') {
                        iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                    } else if (route.name === 'MY') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                    }
                    if (route.name === '플로깅') return (
                        <TouchableOpacity
                            hitSlop={{ top: 0, bottom: 20, left: 10, right: 10 }}
                            onPress={() => navigation.navigate('ploggingActivity', { msg: "plogging start" })}>
                            <View style={style.backGround}>
                                <Image
                                    style={style.icon}
                                    source={require('./components/plogging/icons/ploggingBottomTap.png')}
                                />
                            </View>
                        </TouchableOpacity>
                    )
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
            <MainScreenTab.Screen name="기록" component={RecordContainer} />
            <MainScreenTab.Screen name="플로깅" component={Plogging} />
            <MainScreenTab.Screen name="채팅 목록" component={Chat} />
            <MainScreenTab.Screen name="MY" component={MyPage} />
        </MainScreenTab.Navigator>
    )
}

export const RootNavigator = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="NicknameRegister"
        component={NicknameRegister}
        options={{headerShown: false, gestureEnabled: false}}
      />
            <Stack.Screen name="M" component={AppTabComponent} options={{ title: ' ', headerShown: false }} />
            <Stack.Screen name="ploggingActivity" component={Plogging} options={{ title: '', headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="CameraPage" component={CameraPage} options={{ headerShown: false }} />
            <Stack.Screen name="InChatRoom" component={InsideRoom} />
            <Stack.Screen name="logDetail" component={LogDetail} options={{ title: '' }} />
        </Stack.Navigator>
    )
}

const style = StyleSheet.create({
    backGround: {
        width: "100%",
        height: 35,
        //borderRadius: 25,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 2,
        backgroundColor: "white",

    },
    icon: {
        zIndex: 100,
        width: 30,
        height: 30
    }
});
