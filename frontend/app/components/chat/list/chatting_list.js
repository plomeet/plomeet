import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import ChattingRoom from './chatting_room';
import { FlatList } from 'react-native-gesture-handler';
import { Container } from '../styles';
import firestore from '@react-native-firebase/firestore';
import data from '../dump_data';

const ChattingList = () => {
    const navigation = useNavigation();
    //const [meetingChatInfos, setMeetingChatInfos] = useState([]);
    const [meetings, setMeetings] = useState([]);

    const _handleChattingRoomPress = ( item ) => {
        navigation.navigate('InChatRoom', {item});
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

    useEffect(() => {
        //테스트용도 > meetings collection 데이터 가져오기...!
        const subscriber = firestore()
            .collection('meetings')
            .onSnapshot(querySnapShot => {
                const list = [];
                querySnapShot.forEach(meeting => {
                    list.push(meeting.data());
                });
            setMeetings(list);
            });
            return () => subscriber();
    }, []);
    

    return (
        <Container>
            <FlatList
                keyExtractor={item => item.meeting.meetingId}
                data={data}
                renderItem={renderChattingRoom}
            />
        </Container>
    );
};

export default ChattingList;
