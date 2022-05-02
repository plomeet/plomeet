import styled from 'styled-components/native'

export const color = {
    primary: '#1BE58D',
    primaryLight: '#D5FF7C',
    primaryBlue: '#12D3DD',
    primaryDark: '#303644',
    white: '#ffffff',
    black: '#000000',
    blackFont: '#040404',
    blackLightFont: '#292D32',
    greyFont: '#7A7A7A',
    redBadge: '#FF5442',
};


export const Container = styled.View`
    background-color: ${color.white};
`;

//채팅방
export const ChattingRoomComp = styled.TouchableOpacity`
    height: 60px;
    background-color: ${color.white};
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 25px;
    margin-right: 25px;
    flex-direction: row;
`;

//채팅방 정보{방 제목, 참여인원 수, 최신 메세지}
export const ChattingRoomInfoComp = styled.View`
    flex-direction: column;
    flex: 1;
    flex-grow: 1;
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 10px;
`;
//채팅방 추가 정보{최신 수신 시점, 안읽은 메세지 개수}
export const ChattingRoomInfoAddComp = styled.View`
    flex-direction: column;
    flex-basis: auto;
    align-items: flex-end;
    margin-top: 10px;
    margin-left: 5px;
`;
//채팅방 정보 첫번째 줄
export const ChattingRoomInfoUpLineComp = styled.View`
    flex-direction: row;
    padding-right: 25px;
`;
//채팅방 정보 두번째 줄
export const ChattingRoomInfoDownLineComp = styled.View`
    margin-top: 5px;
    flex-direction: row;
`;


//채팅방 이미지
export const ChattingRoomImg = styled.Image`
    flex-basis: auto;
    width: 50px;
    height: 50px;
    margin-top: 5px;
    border-radius: 50px;
    background-color: ${color.black};
`;
//채팅방 이름
export const ChattingRoomName = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${color.blackFont};
`;
//채팅방 참여인원
export const ChattingRoomMember = styled.Text`
    margin-left: 3px;
    font-size: 13px;
    color: ${color.blackLightFont};
`;
//채팅방 최신 수신 시점
export const ChattingRoomLastTime = styled.Text`
    font-size: 12px;
    color: ${color.greyFont};
`;
//채팅방 최근 메세지
export const ChattingRoomLastChat = styled.Text`
    font-size: 13px;
    color: ${color.blackFont};
`;
//채팅방 안읽은 메세지 개수 뱃지
export const ChattingRoomUnReadBadge = styled.View`
    margin-top: 5px;
    border-radius: 10px;
    background-color: ${color.redBadge};
    padding-left: 7px;
    padding-right: 7px;
`;
//채팅방 안읽은 메세지 개수 글자
export const ChattingRoomUnRead = styled.Text`
    font-size: 13px;
    color: ${color.white};
`;