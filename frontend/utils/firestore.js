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