import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Octicons'
import { color } from '../styles';
import {
    ChattingRoomComp,
    ChattingRoomInfoComp,
    ChattingRoomInfoAddComp,
    ChattingRoomInfoUpLineComp,
    ChattingRoomInfoDownLineComp,
    ChattingRoomImg,
    ChattingRoomName,
    ChattingRoomMember,
    ChattingRoomLastTime,
    ChattingRoomLastChat,
    ChattingRoomUnReadBadge,
    ChattingRoomUnRead,
} from './styles';


const getDateOrTime = (dateTime) => {
    console.log(dateTime);
    if(dateTime==null) return null;
    const now = moment().add(9, 'hours').startOf('day');
    const target = moment(dateTime).add(9, 'hours').startOf('day');
    return moment(dateTime).add(9, 'hours').format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm');
};


const ChattingRoom = ( props ) => {
    const meeting = props.meeting;
    const chatting = props.chatting;
    const [lastTime, setLastTime] = useState("");

    useEffect(() => {
        setLastTime(getDateOrTime(chatting.lastTime));
    }, []);

    return(
        <ChattingRoomComp onPress={props.onPress}>
            <ChattingRoomImg source={{uri: meeting.meetingImg}} />
            <ChattingRoomInfoComp>
                <ChattingRoomInfoUpLineComp>
                    <ChattingRoomName numberOfLines={1} ellipsizeMode="tail">{meeting.meetingName}</ChattingRoomName>
                    <Icon name="person" size={14} color={color.black} style={{marginLeft: 5, marginTop: 2}}/>
                    <ChattingRoomMember>{meeting.memberCnt}</ChattingRoomMember>
                </ChattingRoomInfoUpLineComp>
                <ChattingRoomInfoDownLineComp>
                    <ChattingRoomLastChat numberOfLines={1} ellipsizeMode="tail">{chatting.lastMsg}</ChattingRoomLastChat>
                </ChattingRoomInfoDownLineComp>
            </ChattingRoomInfoComp>
            <ChattingRoomInfoAddComp>
                <ChattingRoomLastTime>{lastTime}</ChattingRoomLastTime>
                { chatting.unReadCnt==0
                ? null :
                    <ChattingRoomUnReadBadge>
                        <ChattingRoomUnRead>{chatting.unReadCnt}</ChattingRoomUnRead>
                    </ChattingRoomUnReadBadge>
                }
                
            </ChattingRoomInfoAddComp>
        </ChattingRoomComp>
    );
};


export default ChattingRoom;