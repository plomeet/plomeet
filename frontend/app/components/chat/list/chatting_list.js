import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import ChattingRoom from './chatting_room';
import { FlatList } from 'react-native-gesture-handler';
import { Container } from '../styles';
import firestore from '@react-native-firebase/firestore';
import { axiosInstanceLocal } from '../../../../utils/API';


const ChattingList = React.memo(()=> {
    const navigation = useNavigation();
    const userId="1";
    const [meeting, setMeeting] = useState();
    const [chatRooms, setChatRooms] = useState([]);

    const _handleChattingRoomPress = async ( item ) => {
        navigation.navigate('InChatRoom', {meeting: item.meeting, userId});
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
        for(const meeting of queryArray){
            const meetingId = meeting.data().meetingId.toString();
            //console.log(meetingId);
            //console.log(meeting.data());
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

            const meetingInfo = await getMeetingInfo(meetingId);
            //console.log(meetingInfo);

            const chatRoom = {
                meeting:{
                    meetingId,
                    meetingName: meetingInfo.meetingName,
                    meetingImg: meetingInfo.meetingImg,
                    memberCnt: meetingInfo.memberCnt,
                    memberMax: meetingInfo.memberMax,
                    meetingDate: meetingInfo.meetingDate,
                    meetingPlace: meetingInfo.meetingPlace,
                    item: meetingInfo.item,
                },
                chatting: chat,
            }
            console.log(chatRoom);
            list.push(chatRoom);
        }
        setChatRooms(list);
    }

    const getLastReadChat = async (docRef) => {
        var lastReadChat = null;
        await docRef
            .collection('members').doc(userId)
            .get().then((doc) => {
                lastReadChat = {
                    id: doc.data().lastReadChatId,
                    time: doc.data().lastReadChatTime,
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
                console.log(chatDocs);
                lastChatInfo.unReadCnt=chatDocs.length-1;
                const lastChatData = chatDocs[0].data();
                lastChatInfo.lastTime=lastChatData.createdAt;
                lastChatInfo.lastMsg=lastChatData.text;
                if(lastChatInfo.unReadCnt==1&& lastReadChatTime==lastChatInfo.lastTime) lastChatInfo.unReadCnt=0;
            });
        return lastChatInfo;
    }

    /*
    const getMeetingInfos = async() => {
        try {
            await axiosInstanceLocal.get(`/chat/${userId}`)
                .then((response) => {
                    if (response.status === 200) {
                        setMeetings(response.data);
                        console.log(response.data);
                        //console.log("get Trashcans SUCCESS");
                    } else {
                        console.log("error");
                    }
                })
                .catch((response) => { console.log(response); });
        } catch (err) { console.log(err); }
    }
    */

    const getMeetingInfo = async(meetingId) => {
        var meetingInfo = {};
        try {
            await axiosInstanceLocal.get(`/meetings/${meetingId}`)
                .then((response) => {
                    if (response.status === 200) {
                        //setMeeting(response.data);
                        meetingInfo = response.data;
                        //console.log("get Trashcans SUCCESS");
                    } else {
                        console.log("error");
                    }
                })
                .catch((response) => { console.log(response); });
        } catch (err) { console.log(err); }
        return meetingInfo;
    }

    useEffect(() => {
        const subscriberMeetingsMember = firestore()
            .collectionGroup('members')
            .where('userId', "==", userId.toString())
            .onSnapshot(querySnapShot => {                  
                const meetingIds = [];
                querySnapShot.forEach((docs) => {
                    meetingIds.push(docs.ref.parent.parent._documentPath._parts[1]);
                });
                //console.log(list);
                const subscriberMeetings = firestore()
                    .collection('meetings')
                    .where('meetingId', 'in', meetingIds)
                    .orderBy('lastChatTime', 'desc')
                    //.get().then((querySnapShot) => {
                    .onSnapshot(querySnapShot => {
                        setChatRoomData(querySnapShot.docs);
                        //console.log(chatRooms);
                    }, error => {
                        console.log(error);
                    });
                return() => subscriberMeetings();
            }, error => {
                console.log(error);
            });
            
            /*
            const subscriberMeetings = await firestore()
                .collection('meetings')
                .where('meetingId', 'in', meetingIds)
                .orderBy('lastChatTime', 'desc')
                .onSnapshot(querySnapShot => {
                    setChatRoomData(querySnapShot.docs);
                }, error => {
                    console.log(error);
                });
            
            return () => {
                //subscriberMeetings();
            }
            */
        return () => {
            subscriberMeetingsMember();
            //subscriberMeetings();
        }
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
});

export default ChattingList;
