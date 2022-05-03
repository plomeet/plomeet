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
                borderColor: color.primaryDark,
                borderWidth: 1,
            }}
        >
        </InputToolbar>
    )
};

export default CustomInputToolbar;