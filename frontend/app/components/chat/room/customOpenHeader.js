import { Redshift } from 'aws-sdk';
import { relativeTimeRounding } from 'moment';
import { View, StyleSheet, Text, TouchableOpacity, Span, Div } from 'react-native';
import Collapsible from 'react-native-collapsible';
import React, { Component } from 'react';


const AppHeaderOpen = ({
    meeting,

}) => {
    return (
        <View style={styles.container}>      
            <View style={styles.subcontainer}>
                <Text style={styles.contents}> 장소 </Text> 
                <Text style={styles.contents}> {meeting.meetingPlace}</Text>
            </View>
            <View style={styles.subcontainer}>
                <Text style={styles.contents}> 인원수 </Text>
                <Text style={styles.contents}> {meeting.meetingMem} / {meeting.meetingMemMax}</Text>
            </View>
            <View style={styles.subcontainer}>
                <Text style={styles.contents}> 날짜 </Text>
                <Text style={styles.contents}> {meeting.meetingDate} </Text>
            </View>
            <View style={styles.subcontainer}>
                <Text style={styles.contents}> 준비물</Text>
                <Text style={styles.contents}> {meeting.meetingItem} </Text>
            </View>
            
        </View>
      );
}



const styles  = StyleSheet.create({
    container: {
        //flexDirection: "row",
        //position:'relative',
        //justifyContent:'space-between',
        height: 200, 
        backgroundColor: '#f6f6f6',

        padding:10,
    },
    subcontainer:{
        flexDirection: "row",
        justifyContent:'space-between',
        padding:5,
    },
    contents:{
        fontSize:15,
        margin:2,

    }

})

export default AppHeaderOpen;