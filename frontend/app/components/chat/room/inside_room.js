import { useState, useEffect } from 'react';
import { GiftedChat  } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Entypo'
import { color, Container } from '../styles';
import CustomBubble from './custom/custom_bubble';
import CustomSend from './custom/custom_send';
import CustomInputToolbar from './custom/custom_inputtoolbar';

import firestore from '@react-native-firebase/firestore';
import { saveChatting, updateUserLastReadChatTime } from '../../../../utils/firestore';
import msg from './dump_data_msg';
//import { createMessage } from '../../../../utils/firestore';
import {View, StyleSheet, Button, Alert} from "react-native";
import { SidebarData } from './SidebarData';
import {TouchableOpacity, Text, TouchableWithoutFeedback} from "react-native";

import * as React from 'react';
//import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
//import { SideBar_, DrawerNavigator } from './DrawerNavigator';
import AppHeader from './customheader';
import Icons from 'react-native-vector-icons/AntDesign';




const InsideRoom = React.memo(({ navigation, route: {params: {meeting, userId}} }) => {
//const InsideRoom = ({ navigation, route: {params: {item}} }) => {   // 윤수가 한거
    //const meeting = item.meeting;
    //const chat = item.chatting;
    //const title = meeting.meetingName;
    const title = meeting.meetingName;
    const [user, setUser] = useState();
    const members = {};
    const [messages, setMessages] = useState([]);

    
    const _handleMessageSend = async messageList => {
        const newMessage = messageList[0];
        const message = {
            text: newMessage.text,
            createdAt: Date.now(),
            userId: newMessage.user._id,
        };
        try{    // 위에께 원래 내가 쓰던 거 
            //await createMessage({  channelId: params.id, message: newMessage});       //channelId: params.id,
            await saveChatting({ meetingId: meeting.meetingId, message});
        }catch(e){
            Alert.alert('Send Message Error', e.message);
        }
    };

    const  _handleMessageUpdate = async(updateUserLastReadChatTimeData) => {
        await updateUserLastReadChatTime({...updateUserLastReadChatTimeData})
    }

    const renderBubble = (props) => {
        const bubbleProps = {
            ...props,
            conUser: user,
        }
        return(
            <CustomBubble {...bubbleProps} />
        )
    };

    const renderInputToolbar = props => {
        return(
            <CustomInputToolbar {...props} />
        )
    };

    const renderSend = (props) => {
        return(
            <CustomSend {...props} />
        )
    };

    function popup(){
        Alert.alert("니 띄웠다ㅋ","ㅇ");
    }


     


    const setMessagesData = async(queryArray) => {
        const list = [];
        const promises = queryArray.map(async message => {
            const messageData = message.data();
            var userInfo = {};
            if(members[userId] == undefined) members[userId] = await getUserInfo(messageData.userId);
            userInfo = members[userId];
            //userInfo = await getUserInfo(messageData.userId);
            const messageInfo = {
                _id: messageData._id,
                text: messageData.text,
                createdAt: messageData.createdAt,
                user: userInfo,
            };
            list.push(messageInfo);
        });
        await Promise.all(promises);

        setMessages(list);
    };

    const getUserInfo = async (messageUserId) => {
        const userInfo = {};
        await firestore().collection('users')
            .doc(messageUserId).get().then((doc)=>{
                userInfo._id = messageUserId;
                userInfo.name = doc.data().userNickName;
                userInfo.avatar = doc.data().userProfileImg;
            });
        return userInfo;
    };
    
    

    useEffect(() => {
        // 윤수가 없앰
        /*
        navigation.setOptions({
            headerTitle: "hi",//title,
            headerRight: () => (
                <Icon onPress = {()=> navigation.openDrawer() } 
                 name="menu" size={20} color={color.black} style={{marginRight: 10}} />
            ),
        });*/


        // 윤수 코드 
        /*
        const list = [];
        msg.forEach(m => {
            list.push(m);
        })
        setMessages(list);*/
        //});   //
    }, []);
    
    
    useEffect(() => {
        const subscriberUser = firestore()
            .collection('users')
            .doc(userId)
            .onSnapshot(querySnapShot => {
                const userData = querySnapShot.data();
                const userInfo = {
                    _id: userData.userId.toString(),
                    avatar: userData.userProfileImg,
                    name: userData.userNickName,
                }
                setUser(userInfo);
            });
        
        //console.log("meetingId::"+ meeting.meetingId);
        const subscriberChatting = firestore()
            .collection('meetings')
            .doc(meeting.meetingId)
            .collection('chattings')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapShot => {
                setMessagesData(querySnapShot.docs);
            });
        
        return () => {
            subscriberUser();
            subscriberChatting();
        }
    }, []);

    /*
    useEffect(() => {
        console.log("meetingId::"+ meeting.meetingId);        
        const subscriberMember = firestore()
            .collection('meetings')
            .doc(meeting.meetingId)
            .collection('members')
            .onSnapshot(querySnapShot => {
                const memberInfos = {};
                querySnapShot.forEach(async (member) => {
                    const memberData = member.data();
                    const memberId = memberData.userId;
                    const userInfo = await getUserInfo(memberId);
                    memberInfos[memberData.userId] = userInfo;
                });
                setMembers(memberInfos);
            });
        return () => subscriberMember();
    }, []);
    */

    
    useEffect(() => {
        if(messages.length != 0){
            const updateUserLastReadChatTimeData = {
                meetingId: meeting.meetingId,
                userId,
                lastChatId: messages[0]._id,
                lastChatTime: messages[0].createdAt,
            };
            _handleMessageUpdate(updateUserLastReadChatTimeData);
        }    
    }, [messages]);
    

    return (
        <Container>
            <View>
            <AppHeader
                title= "oo 모임방 입니다"//"회원가입메롱메롱 공지사항을 어떻게 쓸까 고민중이에요"
                noIcon={false}
                rightIcon={<Icons name="left" size={20} />}
                rightIconPress={() => navigation.goBack()}
            />
            </View>
        <GiftedChat
        listViewProps={{
            style: { 
                backgroundColor: color.white,
                marginBottom: 2,
            },
        }}
        placeholder="메세지를 입력해주세요"
        messages={messages}
        user={user}
        renderUsernameOnMessage={true}
        scrollToBottom={true}
        renderBubble={renderBubble}
        textInputProps={{
            autoCapitalize: 'none',
            autoCorrect: false,
            textContentType: 'none',
            underlineColorAndroid: 'transparent',
        }}
        multiline={true}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        onSend={_handleMessageSend}
        alwaysShowSend={true}
    />
    </Container>
    );
});

export default InsideRoom;