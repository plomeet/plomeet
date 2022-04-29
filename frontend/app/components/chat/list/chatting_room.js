import React from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Octicons'
import { color,
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
    const now = moment().startOf('day')
    const target = moment(dateTime).startOf('day')
    return moment(dateTime).format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm');
};


const ChattingRoom = ( props ) => {
    const meeting = props.meeting;
    const chatting = props.chatting;
    chatting.lastTime = getDateOrTime(chatting.lastTime);   


    return(
        <ChattingRoomComp>
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
                <ChattingRoomLastTime>{chatting.lastTime}</ChattingRoomLastTime>
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