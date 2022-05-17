import { useState, useEffect } from 'react';
import { GiftedChat  } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Entypo'
import { color, Container } from '../styles';
import CustomBubble from './custom/custom_bubble';
import CustomSend from './custom/custom_send';
import CustomInputToolbar from './custom/custom_inputtoolbar';
import msg from './dump_data_msg';
//import { createMessage } from '../../../../utils/firestore';
import {View, StyleSheet, Button, Alert} from "react-native";
import { SidebarData } from './SidebarData';
import {TouchableOpacity, Text} from "react-native";

import * as React from 'react';
//import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {   Extrapolate,interpolateColors,interpolateNode, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import InsideRoom from './inside_room';
import AppHeader from './customheader';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './MainPage';
import Chat from '../index';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import ChatRoom from './inside_room';

import {
  ChattingRoomComp,
  ChattingRoomInfoComp,
  ChattingRoomInfoAddComp,
  ChattingRoomInfoUpLineComp,
  ChattingRoomInfoDownLineComp,
  ChattingRoomImg,
  ChattingRoomName,
  ChattingRoomMember,
  ChattingRoomLastTime,
  ChattingRoomLastChat,
  ChattingRoomUnReadBadge,
  ChattingRoomUnRead,
} from '../list/styles';
import CollapsibleView from './CollapsibleView';
import CollapsibleViewTestScreen from './CollapsibleViewTestScreen';


const Drawer = createDrawerNavigator();


const CustomDrawer = props => {
    return(
        <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 15,
              backgroundColor: '#f6f6f6',
              marginBottom: 10,
            }}
          >
            <View>
              <Text >모임인원</Text>
              
            </View>
          </View>

          <View>
              <ChattingRoomComp>
                <ChattingRoomImg  />
                <ChattingRoomLastChat>
                채팅인원
                </ChattingRoomLastChat>
              </ChattingRoomComp>

          </View>


          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            left: 10,
            bottom: 30,//280,
            backgroundColor: '#12D3DD', //'#1BE58D', //'#009DAE',
            padding: 10,
            borderRadius: 20
          }}onPress={() => alert('채팅방을 나가면 모임에서도 탈퇴됩니다. 정말나가시겠습니까?')}
        >
          <Text style = {styles.logoutText}>나가기</Text>
          
        </TouchableOpacity>


      </View>
    );
}

    // 윤수 추가 : 채팅방에 멤버 띄우는 함수
    /*
    const getMeetingUsers = async(meetingId) => {
        const meetingUsers = {};
        await firestore().collection('meetings')
            .doc(meetingId).collection('members')
            .doc(userId).get().then((doc)=>{
                for(document in doc){
                    meetingUsers._id = document.data().userId;
                    console.log(document.data());
                }
                
            });
        return meetingUsers;
    }*/
    const getMeetingUsers = async(meetingId) => {
      const meetingUsers = {};
      try {
          await axiosInstance.get(`/chat/${meetingId}`)
          //await axios.get(`127.0.0.1:8000/chat/${meetingId}`)
              .then((response) => {
                  if (response.status === 200) {
                      meetingUsers = response.data;        // 여기 더 수정!!! 
                      //console.log(meetingInfo);
                      //console.log(meetingInfo.item);
                      //console.log(meetingInfo.registerDate);
                  } else {
                      console.log("error");
                  }
              })
              .catch((response) => { console.log(response); });
      } catch (err) { console.log(err); }
      return meetingUsers;
  }


function HeaderR() {
    return ( <Ionicons name="notifications-outline"size={30}></Ionicons>);
   
}

const DrawerNavigator = (props) => {  //const DrawerNavigator = ({item}) => {  
  const meeting = props.data.route.params.meeting;
  const userId = props.data.route.params.userId;
  //console.log("하이하이하이"+ meeting,userId);

  // 윤수가 추가함 
    const navigation = useNavigation();
    useEffect(()=>{
        navigation.setOptions({
            //headerTitle: '',//title,
            headerRight: () => (
              <Icon onPress = {()=> navigation.dispatch(DrawerActions.openDrawer()) } 
               name="menu" size={20} color={color.black} style={{marginRight: 10}} />
          ),
        });
    }, []);

    return (
        <Drawer.Navigator screenOptions={{
          drawerPosition: "right",
          headerShown: false,
        }}
        drawerContent={props => <CustomDrawer {...props} /> } 
        >
          <Drawer.Screen name='Menu' component={InsideRoom} initialParams={{meeting:meeting, userId:userId}}/>
        </Drawer.Navigator >
    );

}   

export function SideBar_(props){
    return (
        <DrawerNavigator data={props} />
    );
}

const styles = StyleSheet.create({
    logoutBox: {
      //position: 'absolute',
      flex: 1,
      width:200,
      height:0,
      backgroundColor: '#009DAE',
    },
    logoutText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      //marginLeft: 30
    }
})
