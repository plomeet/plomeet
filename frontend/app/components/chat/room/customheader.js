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
}) => {
    console.log(meeting);
    return (
        <View style={styles(2).container}>      
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
                </TouchableOpacity>
            </View>
            {rightIcon &&
                <TouchableOpacity
                    style={styles.rightIcon}
                    onPress={rightIconPress}
                >
                    {rightIcon}
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = (height) => StyleSheet.create({
    container: {
        height: height * 30, //height * 32,
        marginTop: 5, // height * 32,
    },
    titleContainer: {
        height: '100%',
        justifyContent: 'center',
    },
    leftIcon: {
        position: 'absolute',
        top: 10,
        left: 5,
        justifyContent: 'center'
    },
    rightIcon: {
        position: 'absolute',
        bottom: 10,
        right: 5,
        justifyContent: 'center'
    }
})
export default AppHeader;