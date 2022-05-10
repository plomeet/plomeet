import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import ChattingRoom from './chatting_room';
import { FlatList } from 'react-native-gesture-handler';
import { Container } from '../styles';
import firestore from '@react-native-firebase/firestore';
//import data from '../dump_data';
import meetings_data from '../dump_data_meetings';
import { ThemeConsumer } from 'styled-components';


const ChattingList = () => {
    const navigation = useNavigation();
    const userNum="1";
    const [user, setUser] = useState();
    const [meetings, setMeetings] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);

    const _handleChattingRoomPress = ( item ) => {
        navigation.navigate('InChatRoom', {item, userNum});
    }

    const renderChattingRoom = ({ item }) => {
        return(
            <ChattingRoom 
                meeting={item.meeting}
                chatting={item.chatting}
                onPress = {()=> _handleChattingRoomPress(item)}
            />
        )
    }

    const setChatRoomData = async (queryArray) => {
        const list = [];
        const promises = queryArray.map(async meeting => {
            console.log(meeting.data());
            const meetingId = meeting.data().meetingId;
            console.log(meetingId);
            const meetingDocRef = firestore()
                            .collection('meetings').doc(meetingId);
            const lastReadChat= await getLastReadChatId(meetingDocRef);
            //console.log("마지막으로 읽은 채팅ID:: "+lastReadChat);
            
            var lastReadChatTime = 0;
            if(lastReadChat != 0){
                lastReadChatTime = await getLastReadChatTime(meetingDocRef, lastReadChat);
            }
            //console.log("마지막으로 읽은 채팅시간:: "+lastReadChatTime);

            var chat;
            if(lastReadChatTime == 0){
                chat = await getLastChatInfoAll(meetingDocRef);
            }else{
                chat = await getLastChatInfo(meetingDocRef, lastReadChatTime);
            }
            console.log(chat);

            const chatRoom = {
                meeting:{
                    meetingId,
                    meetingName: meetings_data[meetingId].meetingName,
                    meetingImg: meetings_data[meetingId].meetingImg,
                    memberCnt: meetings_data[meetingId].memberCnt,
                    memberMax: meetings_data[meetingId].memberMax,
                    meetingDate: meetings_data[meetingId].meetingDate,
                    meetingPlace: meetings_data[meetingId].meetingPlace,
                    item: meetings_data[meetingId].item,
                },
                chatting: chat,
            }
            console.log(chatRoom);
            list.push(chatRoom);
        });
        await Promise.all(promises);
        
        setChatRooms(list);
    }

    const getLastReadChatId = async (docRef) => {
        var lastReadChatId = '';
        await docRef
            .collection('members').doc(userNum)
            .get().then((doc) => {
                lastReadChatId= doc.data().lastChatId;
            })
        return lastReadChatId;
    };

    const getLastReadChatTime = async (docRef, chatId) => {
        var lastReadChatTime = '';
        await docRef
            .collection('chattings').doc(chatId)
            .get().then((doc) => {
                lastReadChatTime= doc.data().createdAt;
            })
        return lastReadChatTime;
    };

    const getLastChatInfoAll = async (docRef) => {
        const lastChatInfo = {};
        await docRef
                .collection('chattings')
                .orderBy('createdAt', 'desc')
                .get().then((docs) => {            
                    const chatDocs = docs.docs;
                    if(chatDocs.length==0){
                        lastChatInfo.unReadCnt=0;
                        lastChatInfo.lastTime=null;
                        lastChatInfo.lastMsg="";
                    }else{
                        lastChatInfo.unReadCnt=chatDocs.length;
                        const lastChat = chatDocs[0];
                        lastChatInfo.lastTime=lastChat.data().createdAt;
                        lastChatInfo.lastMsg=lastChat.data().text;
                    }
                });
        return lastChatInfo;
    }
    
    const getLastChatInfo = async (docRef, lastReadChatTime) => {
        const lastChatInfo = {};
        await docRef
            .collection('chattings')
            .orderBy('createdAt', 'desc')
            .where('createdAt', '>', lastReadChatTime)
            .get().then((docs) => {
                const chatDocs = docs.docs;
                lastChatInfo.unReadCnt=chatDocs.length;
                const lastChat = chatDocs[0];
                lastChatInfo.lastTime=lastChat.data().createdAt;
                lastChatInfo.lastMsg=lastChat.data().text;
            });
        return lastChatInfo;
    }

    useEffect(() => {
        const meetingIds = meetings_data.list.meetingIds;
        console.log(meetingIds);
        
        const subscriber = async () => {
            const subscriberMeetings = await firestore()
                .collection('meetings')
                .where('meetingId', 'in', meetingIds)
                .orderBy('lastChatTime', 'desc')
                .onSnapshot(querySnapShot => {
                    if(querySnapShot != null){
                        setChatRoomData(querySnapShot.docs);
                        console.log(chatRooms);
                    }
                });
                return () => subscriberMeetings();
        }
        //subscriber();

        const subscriberMeetings = firestore()
            .collection('meetings')
            .where('meetingId', 'in', meetingIds)
            .orderBy('lastChatTime', 'desc')
            .onSnapshot(querySnapShot => {
                if(querySnapShot != null){
                    setChatRoomData(querySnapShot.docs);
                    console.log(chatRooms);
                }
            });
        return () => subscriberMeetings();
        //return () => subscriberMeetings();
    }, []);


    return (
        <Container>
            <FlatList
                keyExtractor={item => item.meeting.meetingId}
                data={chatRooms}
                renderItem={renderChattingRoom}
            />
        </Container>
    );
};

export default ChattingList;
