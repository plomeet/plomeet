import { Redshift } from 'aws-sdk';
import { relativeTimeRounding } from 'moment';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { RotateInDownLeft } from 'react-native-reanimated';
//import {AccordionView} from './test';

const INITIAL_LINE =3;
const MAX_LINE =5;


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
                    <Text style={{ color:"#000", textAlign: 'left' , fontSize:15, margin:6, fontWeight:'bold', marginLeft:18}}> {title} </Text>

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

      );
}



const styles  = StyleSheet.create({
    container: {
        //display: 'flex',
        //flexDirection: "row",
        position:'relative',
        height: 57, 
        backgroundColor: '#fff',
        // backgroundColor: '#f6f6f6',
        borderColor: '#f6f6f6',
        borderBottomWidth: 1,
    },
    titleContainer: {
        position:'absolute',
        height: '100%',
        width:'75%',
        top:10,
        marginLeft: 50,
        marginRight: 50,
        //backgroundColor:'#1E6738',
    },
    leftIcon: {
        position:'absolute',
        top:10,
        left:25,
        margin:5,
    },
    rightIcon: {
        position:'absolute',
        top:10,
        right:10,
        margin:5,
    }
})

export default AppHeader;