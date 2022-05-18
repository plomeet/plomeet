import React, { Component, Node, Button, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { LogBox , SafeAreaView, Modal, StyleSheet, Text, View, FlatList, Image, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Align } from '../plogging/map';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axiosInstance from '../../../utils/API';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flex:1,
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 15,
    
  },
  card: {
    backgroundColor: '#fff',
    flex:0.48,
    borderRadius: 8,
    marginBottom: 20,
    paddingBottom: 10,
    borderColor: "#bbbbbb",
    borderWidth:0.4,
  },
  elevation: {
    elevation: 5,
    shadowColor: '#bbbbbb',
  },
  img: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
    height: 100,
  },
  title: {
    fontSize: 14,
    color: '#313333',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5,
  },
  content: {
    fontSize: 12,
    color: '#000000',
    marginLeft: 7,

  },
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 3,
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 65,
    height: 65,
    shadowColor: '#bbbbbb',
  },
  closeButton: {
    height: 42,
    borderRadius : 8,
    backgroundColor: "#1BE58D",
    justifyContent: "center",
    alignItems: "center",
    marginLeft:3
  },
  deleteButton: {
    height: 42,
    borderRadius : 8,
    borderWidth: 2,
    borderColor: "#1BE58D",
    justifyContent: "center",
    alignItems: "center"
  },
  deleteButtonText: {
    fontSize: 18,
    color: "#1BE58D"
  },
  buttonText: {
    fontSize: 18,
    color: "#fff"
  },
  chipLeader : {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor : "#FFEB81",
    opacity: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    width: 60,
    paddingVertical: 1,
    justifyContent: "center"
  },
  textLeader : {
    color: "#000",
    alignItems: "center",
  },
  invisible : {
    position: 'absolute',
    right: 5,
    top: 5,
    opacity: 0
  }
});

const MeetingList = () => {
  const navigation = useNavigation();
  const [myMeetingListInfo, setMyMeetingListInfo] = useState([]);
  const [myMeetingList, setMyMeetingList] = useState([]);
  const [imLeaderList, setImLeaderList] = useState([]);
  const isFocused = useIsFocused();
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  function parse(str) {
    var y = str.substr(0, 4);
    var m = str.substr(5, 2);
    var d = str.substr(8, 2);
    var ymd = new Date(y,m-1,d);
    let day = week[ymd.getDay()];
    var res = m+"월 "+d+"일("+day+") "+ str.substr(11, 5);
    return res
  }

  //모임 정보 세팅
  useEffect(() => {
    AsyncStorage.getItem('myMeeting', (err, result) => {
      setMyMeetingListInfo(JSON.parse(result).reverse());
    })
    AsyncStorage.getItem('myMeetingList', (err, result) => {
      setMyMeetingList(JSON.parse(result));
    })
    AsyncStorage.getItem('imLeaderList', (err, result) => {
      setImLeaderList(JSON.parse(result));
  })
  }, []);

  const Item = ({ meetingId, meetingDesc, isVisible, img, title, place, numMember, maxMember, date, index, lat, lng, placeDetail}) => (
    <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => navigation.navigate('MeetingDetail', {meetingId:meetingId, myMeetingList:myMeetingList})}
    // style={[ index%2===0? {marginRight:20} : {marginRight:0}, styles.card, styles.elevation]}>
    style={[styles.card, styles.elevation]}>
      <Image source={{uri: img}} style={styles.img} />
      <View style={isVisible>=0 ? styles.chipLeader : styles.invisible}><Text style={styles.textLeader}>운영중</Text></View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row } >
        <Icon name='person-outline' size={14} color='#292D32' />
        <Text style={styles.content}>{numMember}/{maxMember}</Text>
        <Icon style={{marginLeft:15}} name='location' size={14} color='#292D32' />
        <Text style={styles.content}>{place}</Text>
      </View>
      <View style={styles.row}>
      <Icon name='md-calendar-sharp' size={14} color='#292D32' />
        <Text style={styles.content}>{date}</Text>
      </View>    
    </TouchableOpacity>
  );
  
  const renderItem = ({ item }) => (
    <Item 
    img = {item.meetingImg}
    title={item.meetingName}
    place={item.meetingPlace}
    numMember={item.memberCnt}
    maxMember={item.memberMax}
    lat = {item.lat}
    lng = {item.lng}
    placeDetail = {item.meetingPlaceDetail}
    date = {parse(item.meetingDate)}
    meetingId = {item.meetingId}
    meetingDesc = {item.meetingDesc}
    isVisible = {imLeaderList.indexOf(item.meetingId)}
    index = {item.meetingId} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        columnWrapperStyle={[{justifyContent: 'space-between'}, {marginHorizontal:20}]}
        data={myMeetingListInfo}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.meetingId}
        windowSize={50}
        numColumns = {2}
      />
    </SafeAreaView>
  );
}

export default MeetingList;