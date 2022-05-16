import firestore from '@react-native-firebase/firestore';


export const saveChatting = async ({meetingId, message}) => {
    const chattingsRef = firestore()
        .collection('meetings').doc(meetingId)
        .collection('chattings');
    const newMessageRef = chattingsRef.doc();
    const newMessageId = newMessageRef.id;
    
    const newChatting = {
        _id: newMessageId,
        ...message,
    };
    await chattingsRef.doc(newMessageRef.id).set(newChatting);
    //await updateUserLastReadChatTime({meetingId, userId: message.userId, lastChatId: newMessageId, lastChatTime: message.createdAt});
    await updateLastChatTime({meetingId, lastChatTime: message.createdAt});
}

export const updateLastChatTime = async ({meetingId, lastChatTime}) => {
    const chattingDocRef = firestore()
        .collection('meetings').doc(meetingId);
    await chattingDocRef.update({
        lastChatTime: lastChatTime,
    });
}

export const updateUserLastReadChatTime = async ({meetingId, userId, lastChatId, lastChatTime}) => {
    const memberDocRef = firestore()
        .collection('meetings').doc(meetingId)
        .collection('members').doc(userId);
    await memberDocRef.update({
        lastReadChatId: lastChatId,
        lastReadChatTime: lastChatTime,
    });
}

//신규 사용자 추가
export const createUser = async ({userId, userNickName, userProfileImg}) => {
    const usersRef = firestore().collection('users');
    const newUser = {
        userId,
        userNickName,
        userProfileImg,
    }
    await usersRef.doc(userId).set(newUser);
}

//새로운 모임 생성 > 채팅방 생성
export const createMeeting = async ({meetingId, userId}) => {
    const meetingsRef = firestore().collection('meetings');
    const newMeeting = {
        meetingId: meetingId,
        lastChatTime: 0,    //이 부분 그냥 방 만들어진 날짜로 해도 될 지 보기...
    }
    //await meetingsRef.doc(meetingId).set(newMeeting);
    //await joinMember(meetingId, userId);
}

//채팅방 사용자 추가
export const joinMember = async ({meetingId, userId}) => {
    const meetingMembersRef = firestore()
        .collection('meetings').doc(meetingId)
        .collection('members');
    const newMember = {
        userId: userId,
        lastChatId: 0,
        lastChatTime: 0, 
    }
    //await meetingMembersRef.doc(userId).set(newMember);
}