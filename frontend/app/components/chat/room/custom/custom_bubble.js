import React, { useState } from 'react';
import moment from 'moment';
import { Bubble, MessageStatusIndicator  } from 'react-native-gifted-chat';
import { color } from '../../styles';
import { BubbleComp, TimeComp } from '../styles';
import { Text, View } from "react-native";
import CustomTime from './custom_time';


const CustomBubble = (props) => {
    const conUser = props.conUser;
    //const position = props.position=='left'? "flex-end": "flex-start";
    const position = props.position;
    console.log(props.currentMessage);

    const renderTime = (props) => {
        return(
            null
        );
    };

    return(
        // <View> 
        //     { conUser._id == props.currentMessage.user._id 
        //     ?
        //     //<BubbleComp style={{justifyDirection: 'flex-end'}}>
        //     <BubbleComp>
        //         <TimeComp style={{}}>
        //             <CustomTime {...props} />
        //         </TimeComp>
        //         <Bubble
        //             {...props}
        //             containerStyle={{
        //                 right:{
        //                     flex: 0,
        //                 },
        //                 left: {
        //                     flex: 0,
        //                 },
        //             }}
        //             textStyle={{
        //                 right: {
        //                     color: color.blackFont,              
        //                 },
        //             }}
        //             wrapperStyle={{
        //                 right: {
        //                     marginLeft: 5,
        //                     backgroundColor: color.primaryBlue,
        //                 },
        //                 left: {
        //                     marginRight: 5,
        //                 }
        //             }}
        //             //renderTime={renderTime}
        //         >
        //         </Bubble>
        //     </BubbleComp>
        //     :
        //     //<BubbleComp style={{justifyDirection: 'flex-start'}}>
        //     <BubbleComp>
        //         <Bubble
        //             {...props}
        //             containerStyle={{
        //                 right:{
        //                     flex: 0,
        //                 },
        //                 left: {
        //                     flex: 0,
        //                 },
        //             }}
        //             textStyle={{
        //                 right: {
        //                     color: color.blackFont,              
        //                 },
        //             }}
        //             wrapperStyle={{
        //                 right: {
        //                     marginLeft: 5,
        //                     backgroundColor: color.primaryBlue,
        //                 },
        //                 left: {
        //                     marginRight: 5,
        //                 }
        //             }}
        //             renderTime={renderTime}
        //         >
        //         </Bubble>
        //         <TimeComp style={{}}>
        //             <CustomTime {...props} />
        //         </TimeComp>
        //     </BubbleComp>
        //     }
            
        // </View>
        <BubbleComp>
            {/*}
            { conUser._id == props.currentMessage.user._id 
            ?
            <TimeComp>
                <CustomTime {...props} />
            </TimeComp>
            : null
            }
            */}
            <Bubble
                {...props}
                containerStyle={{
                    right:{
                        //flex: 0,
                        //backgroundColor: color.redBadge,
                    },
                    left: {
                        //flex: 1,
                        //flex: 0,
                        //backgroundColor: color.redBadge,
                    },
                }}
                textStyle={{
                    right: {
                        //color: color.blackFont,              
                    },
                }}
                wrapperStyle={{
                    right: {
                        //marginLeft: 0,
                        backgroundColor: color.primaryBlue,
                    },
                    left: {
                        //marginRight: 0,
                    }
                }}
                //renderTime={renderTime}
            >
        </Bubble>
        {/*}
        { conUser._id == props.currentMessage.user._id 
            ? null
            :
            <TimeComp>
                <CustomTime {...props} />
            </TimeComp>
        }
        */}
    </BubbleComp>

    );
};

export default CustomBubble;