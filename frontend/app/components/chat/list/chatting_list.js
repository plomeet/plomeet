import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import ChattingRoom from './chatting_room';
import { FlatList } from 'react-native-gesture-handler';
import { Container } from '../styles';
import firestore from '@react-native-firebase/firestore';
import axiosInstance from '../../../../utils/API';
import { useSelector } from 'react-redux';
import PlomeetSpinner from '../../../../utils/PlomeetSpinner';
import NoContent from '../no_content';


const ChattingList = React.memo(()=> {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const userId = useSelector(state => state.userId).toString();
    const [meeting, setMeeting] = useState();
    const [chatRooms, setChatRooms] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);

    const _handleChattingRoomPress = async ( item ) => {   
        navigation.navigate('InChatRoom', {meeting: item.meeting, userId});  //navigation.navigate('InChatRoom', {meeting: item.meeting, userId});
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
            const meetingDocRef = firestore()
                            .collection('meetings').doc(meetingId);
            const lastReadChat=  await getLastReadChat(meetingDocRef);

            /*
            var chat;
            if(lastReadChat.id == 0){
                chat = await getLastChatInfoAll(meetingDocRef);
            }else{
                chat = await getLastChatInfo(meetingDocRef, lastReadChat.time);
            }
            */
            const chat = await getLastChatInfo(meetingDocRef, lastReadChat.time);
            const meetingInfo = await getMeetingInfo(meetingId);

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
            list.push(chatRoom);
        }
        setChatRooms(list);
        setShowSpinner(false);
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
    
    const getLastChatInfo = async (docRef, lastReadChatTime) => {
        const lastChatInfo = {};
        await docRef
            .collection('chattings')
            .orderBy('createdAt', 'desc')
            .where('createdAt', '>=', lastReadChatTime)
            .get().then((docs) => {
                const chatDocs = docs.docs;
                if(chatDocs.length==0){
                    lastChatInfo.unReadCnt=0;
                    lastChatInfo.lastTime=null;
                    lastChatInfo.lastMsg="";
                }else{
                    const firstChatData = chatDocs[chatDocs.length-1].data();
                    const lastChatData = chatDocs[0].data();
                    lastChatInfo.lastTime=lastChatData.createdAt;
                    lastChatInfo.lastMsg=lastChatData.text;
                    lastChatInfo.unReadCnt = chatDocs.length;
                    if(firstChatData.createdAt==lastReadChatTime) lastChatInfo.unReadCnt=chatDocs.length-1;
                    if(lastReadChatTime==lastChatInfo.lastTime) lastChatInfo.unReadCnt=0;
                }
            });
        return lastChatInfo;
    }

    const getMeetingInfo = async(meetingId) => {
        var meetingInfo = {};
        try {
            await axiosInstance.get(`/meetings/${meetingId}`)
                .then((response) => {
                    if (response.status === 200) {
                        meetingInfo = response.data;
                    } else {
                        console.log("error");
                    }
                })
                .catch((response) => { console.log(response); });
        } catch (err) { console.log(err); }
        return meetingInfo;
    }

    useEffect(() => {
        if(isFocused){
            const subscriberMeetingsMember = firestore()
                .collectionGroup('members')
                .where('userId', "==", userId.toString())
                .onSnapshot(querySnapShot => {
                    const meetingIds = ["0"];
                    querySnapShot.forEach((docs) => {
                        meetingIds.push(docs.ref.parent.parent._documentPath._parts[1]);
                    });

                    const subscriberMeetings = firestore()
                        .collection('meetings')
                        .where('meetingId', 'in', meetingIds)
                        .orderBy('lastChatTime', 'desc')
                        //.get().then((querySnapShot) => {
                        .onSnapshot(querySnapShot => {
                            setChatRoomData(querySnapShot.docs);
                        }, error => {
                            console.log(error);
                        });
                    return() => subscriberMeetings();
                }, error => {
                    console.log(error);
                });

            return () => subscriberMeetingsMember();
        }
    }, [isFocused]);

    return (
        
        <Container>
            { showSpinner &&
                <PlomeetSpinner isVisible={showSpinner} size={50}/>
            }
            { chatRooms.length == 0
            ?
            <NoContent/>
            :
            <FlatList
                keyExtractor={item => item.meeting.meetingId}
                data={chatRooms}
                renderItem={renderChattingRoom}
            />
            }
        </Container>
    );
});

export default ChattingList;
