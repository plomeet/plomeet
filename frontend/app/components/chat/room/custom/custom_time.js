import React from 'react';
import { Time  } from 'react-native-gifted-chat';
import { color } from '../../styles';
import { Text, View } from "react-native";

const CustomTime = (props) => {

    return(
        <Time
            {...props}
            textStyle={{
                right: {
                    color: color.blackFont,
                },
            }}
        />
    )
}

export default CustomTime;