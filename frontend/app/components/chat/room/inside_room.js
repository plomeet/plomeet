import { useState, useEffect, memo, Component, rotate } from 'react';
import { GiftedChat  } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Feather'
import { color, Container } from '../styles';
import CustomBubble from './custom/custom_bubble';
import CustomSend from './custom/custom_send';
import CustomInputToolbar from './custom/custom_inputtoolbar';

import firestore from '@react-native-firebase/firestore';
import { saveChatting, updateUserLastReadChatTime } from '../../../../utils/firestore';
import { useSelector } from 'react-redux';
import PlomeetSpinner from '../../../../utils/PlomeetSpinner';

import {View, StyleSheet, Button, Alert, Text} from "react-native";


import * as React from 'react';

import AppHeader from './customheader';
import AppHeaderOpen from './customOpenHeader';
import Icons from 'react-native-vector-icons/AntDesign';
import axiosInstance from '../../../../utils/API';

import Accordion from 'react-native-collapsible/Accordion';




//const InsideRoom = React.memo(({ navigation, route: {params: {meeting, userId}} }) => {   // 윤수가 한거
const InsideRoom = React.memo(({ navigation, route: {params: {meeting}} }) => {
    const title = meeting.meetingName;
    const [user, setUser] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const userId = useSelector(state => state.userId).toString();
    const name = useSelector(state => state.name);
    const img = useSelector(state => state.img);
    const members = {};
    const [messages, setMessages] = useState([]);
    const [notice, setNotice] = useState(
        "["+{title}.title + "]모임의 플로깅방입니다."
    );

    const meetingId = meeting.meetingId;
    const [meetingInfo, setMeetingInfo] = useState({
        meetingPlace:"",
        meetingMem:"난기본값이다",
        meetingDate:"",
        meetingItem:"",
    });


    const [showSpinner, setShowSpinner] = useState(true);

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


        
    // 윤수 추가 : 공지에 상세정보 띄우는 함수 
    const getMeetingInfo = async() => {
        var meetingInfo = [];
        try {
            await axiosInstance.get(`/meetings/${meetingId}`)
                .then((response) => {
                    if (response.status === 200) {
                        meetingInfo = response.data;                              
                        //console.log(meetingInfo.item);
                        //console.log(meetingInfo.registerDate);
                    } else {
                        console.log("error");
                    }
                })
                .catch((response) => { console.log(response); });
        } catch (err) { console.log(err); }

        setMeetingInfo(preState=>({
            ...preState,
            meetingName: meetingInfo.meetingName,
            meetingPlace: meetingInfo.meetingPlace,
            meetingMem: meetingInfo.memberCnt,
            meetingMemMax: meetingInfo.memberMax,
            meetingDate: meetingInfo.meetingDate,
            meetingItem: meetingInfo.item,
        }));
    }

    

    const setMessagesData = async(queryArray) => {
        const list = [];
        for(const message of queryArray){
            const messageData = message.data();
            const userIdSend = messageData.userId;
            var userInfo = {};
            if(members[userIdSend] == undefined) members[userIdSend] = await getUserInfo(userIdSend);
            userInfo = members[userIdSend];
            //userInfo = await getUserInfo(messageData.userId);
            const messageInfo = {
                _id: messageData._id,
                text: messageData.text,
                createdAt: messageData.createdAt,
                user: userInfo,
            };
            list.push(messageInfo);
        }

        setMessages(list);
        setShowSpinner(false);
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
    


    // [자동실행] 기본 UI 표출용 데이터 받아오는 부분 
    useEffect(() => {
        const userInfo = {
            _id: userId,
            avatar: img,
            name: name,
        };
        setUser(userInfo);
        members[userId] = userInfo;
        
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
            subscriberChatting();
        }

    }, []);

    useEffect(() => {
        getMeetingInfo()
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
    


    // collapsible 관련 const
    const SECTIONS = [
        {
          title: 'First',
          content: 'Lorem ipsum…'
        }
    ];
      
    class AccordionView extends Component {
        state = {
            activeSections: [],
          };
        _renderHeader(section) {
          return (
            <AppHeader
                title= {notice}
                noIcon={false}
                leftIcon={<Icon name="volume-2" size={25} marginLeft={30} color="#000"/>} 
                rightIcon={<Icons name="down" size={20} />} 
                rightIconPress={() => getMeetingInfo()}
                meeting={meetingInfo}
            />
          );
        }
        _renderContent(section) {
          return (
            <AppHeaderOpen
                meeting={meetingInfo}
            />
          );
        }
        _updateSections = (activeSections) => {
            this.setState({ activeSections });
          };
        
          render() {
            return (
              <Accordion
                sections={SECTIONS}
                activeSections={this.state.activeSections}
                renderSectionTitle={this._renderSectionTitle}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
              />
            );
          }
      
    }


    // [렌더링] 화면 구성
    return (
        <Container>
            { showSpinner &&
                <PlomeetSpinner isVisible={showSpinner} size={50}/>
            }
            <AccordionView
                sections={SECTIONS}
                //renderHeader={AccordionView._renderHeader}      //AccordionView._renderHeader
                //renderContent={AccordionView._renderContent}    //AccordionView._renderContent
            />
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