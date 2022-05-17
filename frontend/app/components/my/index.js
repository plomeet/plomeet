import React, { useState, useEffect, Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import BadgeIntro from './badge/badge_intro';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import axiosInstance from '../../../utils/API';
import AsyncStorage from '@react-native-community/async-storage';

const MyPage = () => {


    return (
        <View>
            <Text>내정보 화면</Text>
            <MyMeetingIntro></MyMeetingIntro>
            <BadgeIntro></BadgeIntro>
        </View>
    );
};


const MyMeetingIntro = () => {
  const navigation = useNavigation();
  const [myMeetingListInfo, setMyMeetingListInfo] = useState([]);
  const [myMeetingList, setMyMeetingList] = useState([]);
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
    index = {item.meetingId} />
  );
  
  const Item = ({ meetingId, meetingDesc, img, title, place, numMember, maxMember, date, index, lat, lng, placeDetail}) => (
    <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => navigation.navigate('MeetingDetail', {meetingId:meetingId, myMeetingList:myMeetingList})}
    // style={[ index%2===0? {marginRight:20} : {marginRight:0}, styles.card, styles.elevation]}>
    style={[styles.card, styles.elevation]}>
      <Image source={{uri: img}} style={styles.img} />
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

  useEffect(() => {
    AsyncStorage.getItem('myMeeting', (err, result) => {
      setMyMeetingListInfo(JSON.parse(result));
    })
    AsyncStorage.getItem('myMeetingList', (err, result) => {
      setMyMeetingList(JSON.parse(result));
    })
  }, []);

  return(
    <View style={[{backgroundColor:"#ffffff"},{paddingLeft:10}, {paddingBottom:10}]}>
      <View flexDirection="row" style={[{justifyContent:"space-between"},{alignItems: "center"}]}>
        <Text style={[{marginLeft:5},{marginVertical:10},{fontSize:20}, {color:"#000"}]} >내 모임</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MeetingList')}><View flexDirection="row"><Text style={[{fontSize:13}, {color:"#000"}]}> 더보기 </Text><Icon2 name="chevron-thin-right" size={13} color="#000" style={[{marginLeft: 5}, {marginTop: 2},{marginRight:10}]}/></View></TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={myMeetingListInfo}
        horizontal = {true}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.meetingId}
      />
    </View>
  )
};

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
    height: 200,
    width : 170,
    borderRadius: 8,
    marginBottom: 20,
    paddingBottom: 10,
    borderColor: "#bbbbbb",
    borderWidth:0.4,
    marginHorizontal: 7,
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
});

export default MyPage;