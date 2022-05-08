import React, { useState, useEffect } from 'react';
import { GiftedChat  } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Entypo'
import { color, Container } from '../styles';
import CustomBubble from './custom/custom_bubble';
import CustomSend from './custom/custom_send';
import CustomInputToolbar from './custom/custom_inputtoolbar';
import firestore from '@react-native-firebase/firestore';


const InsideRoom = ({ navigation, route: {params: {item, userNum}} }) => {
    const meeting = item.meeting;
    const chat = item.chatting;
    const title = meeting.meetingName;
    const [user, setUser] = useState();
    const [messages, setMessages] = useState([]);

    
    const _handleMessageSend = async messageList => {
        /*
        const newMessage = messageList[0];
        try{
            await createMessage({ channelId: params.id, message: newMessage});
        }catch(e){
            Alert.alert('Send Message Error', e.message);
        }
        */
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

    const setMessagesData = async(queryArray) => {
        const list = [];
        const promises = queryArray.map(async message => {
            const messageData = message.data();
            const userInfo = await getUserInfo(messageData.userId);
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
    }

    const getUserInfo = async (userId) => {
        const userInfo = {};
        await firestore().collection('users')
            .doc(userId).get().then((doc)=>{
                userInfo._id = userId;
                userInfo.name = doc.data().userNickName;
                userInfo.avatar = doc.data().userProfileImg;
            });
        return userInfo;
    }
    
    
    useEffect(() => {
        navigation.setOptions({
            headerTitle: title,
            headerRight: () => (
                <Icon name="menu" size={20} color={color.black} style={{marginRight: 10}} />
            ),
        });
    }, []);

    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .doc(userNum)
            .onSnapshot(querySnapShot => {
                const userData = querySnapShot.data();
                const user = {
                    _id: userData.userId,
                    avatar: userData.userProfileImg,
                    name: userData.userNickName,
                }
                setUser(user);
            });
        return () => subscriber();
    }, []);

    useEffect(() => {
        //console.log(msg);

        const subscriber = firestore()
            .collection('meetings')
            .doc(meeting.meetingId)
            .collection('chattings')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapShot => {
                setMessagesData(querySnapShot.docs);
            });
        return () => subscriber();
        
    }, []);
    

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