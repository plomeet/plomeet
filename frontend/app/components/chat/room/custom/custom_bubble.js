import React, { useState } from 'react';
import moment from 'moment';
import { Bubble  } from 'react-native-gifted-chat';
import { color } from '../../styles';
import { BubbleComp, TimeComp } from '../styles';
import { Text, View } from "react-native";
import CustomTime from './custom_time';


const CustomBubble = (props) => {
    const [isOwnUser, setIsOwnUer] = useState(Boolean);
    const conUser = props.conUser;
    const currentMessage = props.currentMessage;
    //currentMessage.createdAt = moment(currentMessage.createdAt).format("LT");

    console.log(props);
    console.log(props.conUser);

    const renderTime = (props) => {
        return(
            //<CustomTime {...props} />
            null
        )
    }

    return(
        <BubbleComp>
            
            { conUser._id == props.currentMessage.user._id 
            ? <TimeComp><CustomTime {...props} /></TimeComp>
            : null
            }
            
            <Bubble
                {...props}
                containerStyle={{
                    right:{
                        flex: 0,
                    },
                    left: {
                        flex: 0,
                    },
                }}
                textStyle={{
                    right: {
                        color: color.blackFont,              
                    },
                }}
                wrapperStyle={{
                    right: {
                        marginLeft: 5,
                        backgroundColor: color.primaryBlue,
                    },
                    left: {
                        marginRight: 5,
                    }
                }}
                renderTime={renderTime}
            >
            </Bubble>
            {/*<CustomTime {...props} />*/}
            
            { conUser._id == props.currentMessage.user._id 
            ? null
            : <TimeComp><CustomTime {...props} /></TimeComp>
            }
            
        </BubbleComp>
    )
};

export default CustomBubble;