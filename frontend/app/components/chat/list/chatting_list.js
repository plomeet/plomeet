import React from 'react';
import ChattingRoom from './chatting_room';
import { FlatList } from 'react-native-gesture-handler';
import { Container } from './styles';
import data from '../dump_data';

const ChattingList = () => {
    const renderChattingRoom = ({ item }) => {
        return (
            <ChattingRoom meeting={item.meeting} chatting={item.chatting} />
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
