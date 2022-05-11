import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { color } from '../../styles';
import { Send } from 'react-native-gifted-chat';


const CustomSend = (props) => {

    return (
        <Send
            {...props}
            disabled={!props.text}
            containerStyle={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 4,
            }}
        >
            <Icon name="md-send" size={20} color={color.primary}/>
        </Send>
    )
}

export default CustomSend;