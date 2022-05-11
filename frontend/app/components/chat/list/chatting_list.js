import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import ChattingRoom from './chatting_room';
import { FlatList } from 'react-native-gesture-handler';
import { Container } from '../styles';
import firestore from '@react-native-firebase/firestore';
import meetings_data from '../dump_data_meetings';


const ChattingList = () => {
    const navigation = useNavigation();
    const userNum="1";
    const [meetings, setMeetings] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);

    const _handleChattingRoomPress = ( item, index ) => {
        navigation.navigate('InChatRoom', {meeting: item.meeting, userNum});
        console.log(chatRooms[index].chatting.unReadCnt);
        chatRooms[index].chatting.unReadCnt = 0;
    }

    const renderChattingRoom = ({ item, index }) => {
        return(
            <ChattingRoom 
                meeting={item.meeting}
                chatting={item.chatting}
                onPress = {()=> _handleChattingRoomPress(item, index)}
            />
        )
    }

    const setChatRoomData = async (queryArray) => {
        const list = [];
        for(const meeting of queryArray){
            const meetingId = meeting.data().meetingId;
            console.log(meetingId);
            console.log(meeting.data());
            const meetingDocRef = firestore()
                            .collection('meetings').doc(meetingId);
            const lastReadChat=  await getLastReadChat(meetingDocRef);
            //console.log("마지막으로 읽은 채팅ID:: "+lastReadChat.id);
            //console.log("마지막으로 읽은 채팅Time:: "+lastReadChat.time);

            var chat;
            if(lastReadChat.id == 0){
                chat = await getLastChatInfoAll(meetingDocRef);
            }else{
                chat = await getLastChatInfo(meetingDocRef, lastReadChat.time);
            }
            //console.log(chat);

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
            list.push(chatRoom);
        }
        setChatRooms(list);
    }

    const getLastReadChat = async (docRef) => {
        var lastReadChat = null;
        await docRef
            .collection('members').doc(userNum)
            .get().then((doc) => {
                lastReadChat = {
                    id: doc.data().lastChatId,
                    time: doc.data().lastChatTime,
                }
            })
        return lastReadChat;
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
            .where('createdAt', '>=', lastReadChatTime)
            .get().then((docs) => {
                const chatDocs = docs.docs;
                lastChatInfo.unReadCnt=chatDocs.length-1;
                const lastChatData = chatDocs[0].data();
                lastChatInfo.lastTime=lastChatData.createdAt;
                lastChatInfo.lastMsg=lastChatData.text;
                //if(lastChatInfo.unReadCnt==1&& lastReadChatTime==lastChatInfo.lastTime) lastChatInfo.unReadCnt=0;
            });
        return lastChatInfo;
    }

    useEffect(() => {
        const meetingIds = meetings_data.list.meetingIds;
        console.log(meetingIds);

        const subscriberMeetings = firestore()
            .collection('meetings')
            .where('meetingId', 'in', meetingIds)
            .orderBy('lastChatTime', 'desc')
            .onSnapshot(querySnapShot => {
                console.log(querySnapShot);
                setChatRoomData(querySnapShot.docs);
            }, error => {
                console.log(error);
            });
        return () => {
            //console.log("사라진다......");
            subscriberMeetings();
        }
        //return () => subscriberMeetings();
    }, []);

    useEffect(() => {
        //console.log("채팅방 정보가 바뀌었다...!");
        //console.log(chatRooms);
    }, [chatRooms]);

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
