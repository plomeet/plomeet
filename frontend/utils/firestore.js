import firestore from '@react-native-firebase/firestore';


export const updateLastChatTime = async ({meetingId, lastChatTime}) => {
    const chattingsRef = firestore()
        .collection('meetings').doc(meetingId);
    await chattingsRef.update({
        lastChatTime: lastChatTime,
    });
}

export const saveChatting = async ({meetingId, message}) => {
    const chattingsRef = firestore()
        .collection('meetings').doc(meetingId)
        .collection('chattings');
    const newMessageRef = chattingsRef.doc();
    const newMessageId = newMessageRef.id;

    //const createDate = new Date(Date.now()).toISOString();
    //const createDate = Date.now();
    const newChatting = {
        _id: newMessageId,
        ...message,
    };
    await chattingsRef.doc(newMessageRef.id).set(newChatting);
    await updateLastChatTime(meetingId, message.createdAt);
}