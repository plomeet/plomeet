import firestore from '@react-native-firebase/firestore';


export const saveChatting = async ({meetingId, message}) => {
    const chattingsRef = firestore()
        .collection('meetings').doc(meetingId)
        .collection('chattings');
    const newMessageRef = chattingsRef.doc();
    const newMessageId = newMessageRef.id;

    const createDate = new Date(Date.now()).toISOString();
    const newChatting = {
        _id: newMessageId,
        text: message.text,
        createdAt: createDate,
        userId: message.user._id.toString(),
    };
    await chattingsRef.doc(newMessageRef.id).set(newChatting);
}