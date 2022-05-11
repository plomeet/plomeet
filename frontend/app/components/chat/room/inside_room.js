import React, { useState, useEffect } from 'react';
import { GiftedChat  } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Entypo'
import { color, Container } from '../styles';
import CustomBubble from './custom/custom_bubble';
import CustomSend from './custom/custom_send';
import CustomInputToolbar from './custom/custom_inputtoolbar';
import firestore from '@react-native-firebase/firestore';
import { saveChatting, updateUserLastReadChatTime } from '../../../../utils/firestore';


const InsideRoom = ({ navigation, route: {params: {meeting, userNum}} }) => {
    const title = meeting.meetingName;
    const [user, setUser] = useState();
    //const [members, setMembers] = useState();
    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState();
    var lastMessageTemp = "";

    
    const _handleMessageSend = async messageList => {
        const newMessage = messageList[0];
        const koreaTimeDiff = 9*60*60*1000;
        const message = {
            text: newMessage.text,
            //createdAt: Date.now()+koreaTimeDiff,
            createdAt: Date.now(),
            userId: newMessage.user._id,
        };
        try{
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

    const setMessagesData = async(queryArray) => {
        const list = [];
        const promises = queryArray.map(async message => {
            const messageData = message.data();
            var userInfo = {};
            if(messageData.userId == userNum) userInfo = {"_id": userNum};
            else userInfo = await getUserInfo(messageData.userId);
            //var userInfo = members[messageData.userId];
            //if(userInfo == undefined) userInfo = await getUserInfo(messageData.userId);
            const messageInfo = {
                _id: messageData._id,
                text: messageData.text,
                createdAt: messageData.createdAt,
                user: userInfo,
                //user: members[messageData.userId],
            };
            list.push(messageInfo);
        });
        await Promise.all(promises);

        setMessages(list);
        //setLastMessage(() => list[0]);
        //() => {setLastMessage(list[0])};
    };

    const getUserInfo = async (userId) => {
        const userInfo = {};
        await firestore().collection('users')
            .doc(userId).get().then((doc)=>{
                userInfo._id = userId;
                userInfo.name = doc.data().userNickName;
                userInfo.avatar = doc.data().userProfileImg;
            });
        return userInfo;
    };
    
    
    useEffect(() => {
        navigation.setOptions({
            headerTitle: title,
            headerRight: () => (
                <Icon name="menu" size={20} color={color.black} style={{marginRight: 10}} />
            ),
        });
    }, []);
    
    
    useEffect(() => {
        const subscriberUser = firestore()
            .collection('users')
            .doc(userNum)
            .onSnapshot(querySnapShot => {
                const userData = querySnapShot.data();
                const userInfo = {
                    _id: userData.userId.toString(),
                    avatar: userData.userProfileImg,
                    name: userData.userNickName,
                }
                setUser(userInfo);
            });
        
        console.log("meetingId::"+ meeting.meetingId);
        const subscriberChatting = firestore()
            .collection('meetings')
            .doc(meeting.meetingId)
            .collection('chattings')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapShot => {
                setMessagesData(querySnapShot.docs);
            });
        
        //setLastMessage(messages[0]);
        return () => {
            subscriberUser();
            subscriberChatting();
            //console.log(lastMessage);
            //console.log(lastMessageTemp);
            // const updateUserLastReadChatTimeData = {
            //     meetingId: meeting.meetingId,
            //     userId: userNum,
            //     lastChatId: lastMessage._id,
            //     lastChatTime: lastMessage.createdAt,
            // }
            // updateUserLastReadChatTime({...updateUserLastReadChatTimeData});
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
                userId: userNum,
                lastChatId: messages[0]._id,
                lastChatTime: messages[0].createdAt,
            };
            _handleMessageUpdate(updateUserLastReadChatTimeData);
        }    
    }, [messages]);
    /*
    useEffect(() => {
        console.log("마지막 메세지가 바뀌었다..!");
        console.log(lastMessage);
    }, [lastMessage]);
    */
    

    return (
        <Container>
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