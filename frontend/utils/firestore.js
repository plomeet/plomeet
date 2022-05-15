import firestore from '@react-native-firebase/firestore';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';

/*
export const createMessage = async ({channelId, text})=>{
    return await DebugInstructions.collection('channels')
    .doc(channelId)
    .collection('messages')
    .add({
        text,
        createdAt:Date.now(),
    });
};*/