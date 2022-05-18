import { Redshift } from 'aws-sdk';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
//import { height } from '../../config/globalStyles';

const AppHeader = ({
    title,
    titlePress,
    noIcon,
    rightIcon,
    rightIconPress,
    leftIcon,
    leftIconPress,
    meeting,
    //height,
    // 내가 추가 

}) => {
    return (
        <View style={styles.container}>      
            {leftIcon &&
                <TouchableOpacity
                    style={styles.leftIcon}
                    onPress={leftIconPress}
                >
                    {leftIcon}
                </TouchableOpacity>
            }

            <View style={[styles.titleContainer, noIcon ? {} : { alignSelf: 'center' }]}>
                <TouchableOpacity
                    onPress={titlePress}
                    disabled={titlePress ? false : true}
                >
                    <Text style={{ textAlign: 'left' }}> {title} </Text>
                    <Text> 장소: {meeting.meetingPlace}</Text>
                    <Text> 모집인원: {meeting.meetingMem}</Text>
                    <Text> 날짜: {meeting.meetingDate}</Text>
                    <Text> 준비물: {meeting.meetingItem}</Text>

                </TouchableOpacity>
            </View>

            <View>
            {rightIcon &&
                <TouchableOpacity
                    style={styles.rightIcon}
                    onPress={rightIconPress}
                >
                    {rightIcon}
                </TouchableOpacity>
            }
            </View>
        </View>
    )
}

const styles  = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 5 * 30, //height * 32,
        backgroundColor: '#f6f6f6',
        borderColor: 'black',
        borderWidth: 1,
    },
    titleContainer: {
        height: '100%',
        justifyContent: 'center',
        marginLeft: 20,
        //marginTop: 15,
        //backgroundColor:'#1E6738',
        //backgroundColor: '#f6f6f6',

        //paddingTop: 4000 // height * 32,
        
    },
    leftIcon: {
        //position: 'r',
        //top: 20,
        //left: 20,
        marginLeft: 20,
        marginTop: 15,
        //justifyContent: 'center',

        
    },
    rightIcon: {
        marginLeft: 15,
        marginTop: 15,
        //position: 'absolute',
        //bottom:10,
        //right: 500,
        //right:100,
        //marginRight: 20,
        //marginTop: 20,
        
    }
})

// height 쓰기 위한거    ===========================> 수정! 
const styles2 = (height) => StyleSheet.create({
    container: {
        height: 5 * 30, //height * 32,
        backgroundColor: '#f6f6f6',
        borderColor: 'black',
        borderWidth: 1,
    },
    titleContainer: {
        height: '100%',
        //justifyContent: 'center',
        backgroundColor:'#1E6738',

        //paddingTop: 4000 // height * 32,
        
    },
    leftIcon: {
        position: 'absolute',
        top: 50000,
        //left: 300,
        marginLeft: 30,
        justifyContent: 'center',
        padding: 30,

        
    },
    rightIcon: {
        //position: 'absolute',
        top: 10,
        //top:10,
        right: 500,
        justifyContent: 'center'
    }
})
export default AppHeader;