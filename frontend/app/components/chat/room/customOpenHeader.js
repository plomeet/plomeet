import { Redshift } from 'aws-sdk';
import { relativeTimeRounding } from 'moment';
import { View, StyleSheet, Text, TouchableOpacity, Span, Div } from 'react-native';
import Collapsible from 'react-native-collapsible';
import React, { Component } from 'react';


const AppHeaderOpen = ({
    meeting,

}) => {
  var items = meeting.meetingItem.split('&');

  //시간 예쁘게
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  function parse(str) {
    var y = str.substr(0, 4);
    var m = str.substr(5, 2);
    var d = str.substr(8, 2);
    var ymd = new Date(y,m-1,d);
    let day = week[ymd.getDay()];
    var res = m+"월 "+d+"일("+day+") "+ str.substr(11, 5)
    return res
  }

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
                <Text style={styles.contents}> {parse(meeting.meetingDate)} </Text>
            </View>
            <View style={[styles.subcontainer, {marginTop:5}]}>
                <Text style={styles.contents}> 준비물</Text>
                <View style={[{flexDirection:"row"},{marginTop:0}, {marginRight:5}]}>
                  {items[0] !== undefined && <View style={styles.itemChip}><Text style={{color:"#fff"}}>{items[0]}</Text></View>}
                  {items[1] !== undefined && <View style={styles.itemChip}><Text style={{color:"#fff"}}>{items[1]}</Text></View>}
                  {items[2] !== undefined && <View style={styles.itemChip}><Text style={{color:"#fff"}}>{items[2]}</Text></View>}
                </View>
              </View>
              <View  style={[styles.subcontainer, {marginTop:6}]}>
              {items[3] !== undefined && <Text style={styles.contents}></Text>}
                <View style={[{flexDirection:"row"}, {marginTop:-10}, {marginRight:5}]}>
                  {items[3] !== undefined && <View style={styles.itemChip}><Text style={{color:"#fff"}}>{items[3]}</Text></View>}
                  {items[4] !== undefined && <View style={styles.itemChip}><Text style={{color:"#fff"}}>{items[4]}</Text></View>}
                  {items[5] !== undefined && <View style={styles.itemChip}><Text style={{color:"#fff"}}>{items[5]}</Text></View>}
                  {items[6] !== undefined && <View style={styles.itemChip}><Text style={{color:"#fff"}}>{items[6]}</Text></View>}
                </View>
            </View>
            
        </View>
      );
}



const styles  = StyleSheet.create({
    container: {
        //flexDirection: "row",
        //position:'relative',
        //justifyContent:'space-between',
        // backgroundColor: '#f6f6f6',
        backgroundColor: '#fff',
        borderBottomColor: "#f6f6f6",
        borderBottomWidth: 1,
        paddingBottom: 10,
        // borderRadius: 30,
        // borderBottomLeftRadius : 35,
        // borderBottomRightRadius : 35,
        padding:10,
    },
    subcontainer:{
        flexDirection: "row",
        justifyContent:'space-between',
        padding:5,
    }, 
    itemChip : {
      backgroundColor: "#1BE58D",
      borderRadius: 20,
      paddingHorizontal:12,
      paddingVertical: 5,
      marginHorizontal: 3
    },
    contents:{
        fontSize : 15,
        margin : 2,
        marginHorizontal : 14,
        color: "#000"

    }

})

export default AppHeaderOpen;