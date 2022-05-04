import React from 'react';
import { InputToolbar  } from 'react-native-gifted-chat';
import { color } from '../../styles';


const CustomInputToolbar = (props) => {
    return(
        <InputToolbar
            {...props}
            containerStyle={{
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 25,
                borderTopWidth: 0.3,
                borderTopColor: color.greyFont,
                borderWidth: 0.3,
                borderColor: color.greyFont,
            }}
        >
        </InputToolbar>
    )
};

export default CustomInputToolbar;