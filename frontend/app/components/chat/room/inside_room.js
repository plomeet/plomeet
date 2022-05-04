import React, { useState, useEffect } from 'react';
import { GiftedChat  } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Entypo'
import { color, Container } from '../styles';
import CustomBubble from './custom/custom_bubble';
import CustomSend from './custom/custom_send';
import CustomInputToolbar from './custom/custom_inputtoolbar';
import msg from './dump_data_msg';


const InsideRoom = ({ navigation, route: {params: {item}} }) => {
    const meeting = item.meeting;
    const chat = item.chatting;
    const title = meeting.meetingName;
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
    
    
    useEffect(() => {
        navigation.setOptions({
            headerTitle: title,
            headerRight: () => (
                <Icon name="menu" size={20} color={color.black} style={{marginRight: 10}} />
            ),
        });
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