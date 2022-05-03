import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux"
//Screens
import Home from './components/home/index';
import Record from './components/record/index';
import Plogging from './container/PloggingContainer';
import Chat from './components/chat/index';
import MyPage from './components/my/index';

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
                    } else if (route.name === '채팅') {
                        iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                    } else if (route.name === 'MY') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                    }
                    if (route.name === '플로깅') return (
                        <TouchableOpacity onPress={() => navigation.navigate('ploggingActivity', { msg: "plogging start" })}>
                            <View style={style.backGround}>
                                <IconMaterialIcons style={style.icon} name="gps-fixed" size={30} color="#303644" />
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
            <MainScreenTab.Screen name="기록" component={Record} />
            <MainScreenTab.Screen name="플로깅" component={Plogging} />
            <MainScreenTab.Screen name="채팅" component={Chat} />
            <MainScreenTab.Screen name="MY" component={MyPage} />
        </MainScreenTab.Navigator>
    )
}

export const RootNavigator = () => {
    const isPlogging = useSelector(state => state.isPlogging);

    return (
        <Stack.Navigator>
            <Stack.Screen name="M" component={AppTabComponent} options={{ headerShown: false }} />
            <Stack.Screen name="ploggingActivity" component={Plogging} options={{ title: '', headerShown: !isPlogging }} />
        </Stack.Navigator>
    )
}

const style = StyleSheet.create({
    backGround: {
        width: "100%",
        height: 55,
        //borderRadius: 25,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 12,
        backgroundColor: "grey",
        opacity: 0.2

    },
    icon: {
        zIndex: 100,

    }
});
