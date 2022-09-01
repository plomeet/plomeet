import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import { Menu, MenuItem } from 'react-native-material-menu'; // Home 드롭다운
import { useNavigation } from '@react-navigation/native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Linking, TouchableOpacity, View, StyleSheet, Image, Text, Alert } from "react-native";
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
import MeetingList from './components/my/MeetingList';
import CameraPage from './components/plogging/button/CameraPage';
import LogDetail from './components/record/plogDetail/index';
import Preference from './components/my/preference/index'
import PreferenceAuth from './components/my/preference/auth/index'
import PolicyDoc from './components/my/preference/policyDoc/index'

//Chatting
import InsideRoom from './components/chat/room/inside_room';
import { SideBar_ } from './components/chat/room/DrawerNavigator';
import { DrawerNavigator } from './components/chat/room/DrawerNavigator'

//My
import BadgeList from './components/my/badge/badge_all';


const Stack = createStackNavigator();
const MainScreenTab = createBottomTabNavigator();


const AppTabComponent = () => {
    const navigation = useNavigation();
    const fineLoc = useSelector(state => state.fineLoc);

    const ploggingTabGrantCheck = () => {
        if(fineLoc) navigation.navigate('ploggingActivity', { msg: "plogging start" });
        else {
            if (Platform.OS === 'ios') {
                //혜민's to do
            }
            if (Platform.OS === 'android'){
                Alert.alert(
                    "",
                    "위치 권한을 허용하지 않으면 플로깅 기능을 사용할 수 없어요.\n위치 권한을 항상 허용해주세요",[
                    {text:"확인",onPress:()=>Linking.openSettings()},
                    ]
                )
            }
        }
    }

    return (
        <MainScreenTab.Navigator

            screenOptions={({ route }) => ({
                tabBarStyle: { height: 55, paddingBottom: 5 },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === '홈') {
                        iconName = focused ? 'home-sharp' : 'home-outline';
                    } else if (route.name === '기록') {
                        iconName = focused ? 'calendar' : 'calendar-sharp';
                    } else if (route.name === '채팅 목록') {
                        iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                    } else if (route.name === 'MY') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                    }else if (route.name === '플로깅'){
                            return (
                                <TouchableOpacity
                                    onPress={() => ploggingTabGrantCheck()}
                                    >
                                    <View style={style.backGround}>
                                        <Image
                                            style={style.icon}
                                            source={{ uri: "https://i.postimg.cc/p96ypGcJ/plogging-Bottom-Tap.png" }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )
                       
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
            <MainScreenTab.Screen name="기록" component={RecordContainer} />
            <MainScreenTab.Screen name="플로깅" component={Plogging} options={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { height: 0 } }} />
            <MainScreenTab.Screen name="채팅 목록" component={Chat} />
            <MainScreenTab.Screen name="MY" component={MyPage} options={{
                title: 'MY', headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Preference', { msg: "go Preference screen" })}>
                        <View style={style.preferencBtn}>
                            <Icon name="settings-outline" size={27} color="#000000" />
                        </View>
                    </TouchableOpacity>
                )
            }} />
        </MainScreenTab.Navigator>
    )
}

export const RootNavigator = () => {

  //Home
  //케밥메뉴 숨기고 보이고
  const [kebabVisible, setKebabVisible] = useState(false);
  const hideMenu = () => setKebabVisible(false);
  const showMenu = () => setKebabVisible(true);

  function sendEmail() {
    Linking.openURL('mailto:plomeet205@gmail.com?subject=[게시물 신고]&body=*스크린샷 첨부 시 신고 처리가 빨라집니다.\n*아래 양식을 맞춰 보내주세요.\n\n게시글 제목 : \n신고 사유 : \n스크린샷(선택) : ')
  }

    return (

        <Stack.Navigator>
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
                name="NicknameRegister"
                component={NicknameRegister}
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen name="M" component={AppTabComponent} options={{ title: ' ', headerShown: false }} />
            <Stack.Screen name="ploggingActivity" component={Plogging} options={{ title: '', headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="CameraPage" component={CameraPage} options={{ headerShown: false }} />
            <Stack.Screen name="InChatRoom" component={SideBar_} />
            <Stack.Screen name="OpenMeeting" component={OpenMeeting} options={{ title: '플로깅 모임 생성(1/5)' }} />
            <Stack.Screen name="OpenMeeting2" component={OpenMeeting2} options={{ animationEnabled: false, title: '플로깅 모임 생성(2/5)' }} />
            <Stack.Screen name="OpenMeeting3" component={OpenMeeting3} options={{ animationEnabled: false, title: '플로깅 모임 생성(3/5)' }} />
            <Stack.Screen name="OpenMeeting4" component={OpenMeeting4} options={{ animationEnabled: false, title: '플로깅 모임 생성(4/5)' }} />
            <Stack.Screen name="OpenMeeting5" component={OpenMeeting5} options={{ animationEnabled: false, title: '플로깅 모임 생성(5/5)' }} />
            <Stack.Screen name="MeetingDetail" component={MeetingDetail} options={{
                animationEnabled: false,
                title: '모임 상세정보', headerRight: () => (
                  <View style={style.preferencBtn}>
                      <Menu
                        visible={kebabVisible}
                        anchor={ <TouchableOpacity onPress={showMenu}><Icon2 name="dots-three-vertical" size={18} color="#000000" /></TouchableOpacity>}
                        onRequestClose={hideMenu}
                      >
                        <MenuItem onPress={() => sendEmail()}>신고</MenuItem>
                      </Menu>
                  </View>
            ) }}/>
            <Stack.Screen name="MeetingList" component={MeetingList} options={{ title: '참여한 모임' }} />
            <Stack.Screen name="logDetail" component={LogDetail} options={{ title: '' }} />
            <Stack.Screen name="BadgeList" component={BadgeList} options={{ title: '배지' }} />
            <Stack.Screen name="Preference" component={Preference} options={{ title: '환경설정' }} />
            <Stack.Screen name="PreferenceAuth" component={PreferenceAuth} options={{ title: '계정' }} />
            <Stack.Screen name="PolicyDoc" component={PolicyDoc} options={{ title: '' }} />
        </Stack.Navigator>
    )
}

const style = StyleSheet.create({
    backGround: {
        width: "100%",
        height: 32,
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
    },
    preferencBtn: {
        paddingRight: 20,
    },

});
