import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ChattingRoom from './chatting_room';
import { FlatList } from 'react-native-gesture-handler';
import { Container } from '../styles';
import data from '../dump_data';

const ChattingList = () => {
    const navigation = useNavigation();

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
