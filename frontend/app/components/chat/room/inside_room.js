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


const InsideRoom = ({ navigation, route: {params: {item}} }) => {
    const meeting = item.meeting;
    const chat = item.chatting;
    //const title = meeting.meetingName;
    const user = {
        _id: "23",
        name: "신사동호랭이",
        avatar: "",
    };
    const [messages, setMessages] = useState([]);

    
    const _handleMessageSend = async messageList => {
        /*
        const newMessage = messageList[0];
        try{
            await createMessage({  channelId: params.id, message: newMessage});       //channelId: params.id,
        }catch(e){
            Alert.alert('Send Message Error', e.message);
        }*/
        
    };

    const renderBubble = (props) => {
        const bubbleProps = {
            ...props,
            conUser: user,
        }
        return(
            <CustomBubble {...bubbleProps} />
        )
    }

    const renderInputToolbar = props => {
        return(
            <CustomInputToolbar {...props} />
        )
    }

    const renderSend = (props) => {
        return(
            <CustomSend {...props} />
        )
    }
    function popup(){
        Alert.alert("니 띄웠다ㅋ","ㅇ");
    }


     
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
        const list = [];
        msg.forEach(m => {
            list.push(m);
        })
        setMessages(list);
    }, []);

    useEffect(() => {
        //console.log(msg);

        // const subscriber = firestore()
        //     .collection('channels')
        //     .doc(params.id)
        //     .collection('messages')
        //     .orderBy('createdAt', 'desc')
        //     .onSnapshot(querySnapShot => {
        //         const list = [];
        //         querySnapShot.forEach(doc => {
        //             list.push(doc.data());
        //         });
        //     setMessages(list);
        //     });
        // return () => subscriber();
        
    }, []);
    

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
}

export default InsideRoom;