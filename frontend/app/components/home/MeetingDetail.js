import React, { Component, Node, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Alert, TextInput, Button, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity  } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "../plogging/map";
import { ScrollView } from 'react-native-gesture-handler';
import axiosInstance from '../../../utils/API';
import { useSelector } from 'react-redux';

const MeetingDetail = ({route}) => {
  const isFocused = useIsFocused();
  
  const userId = useSelector(state => state.userId)
  const meetingId = route.params.meetingId;
  const [meetingDesc, setMeetingDesc] = useState("");
  const [meetingImg, setMeetingImg] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [meetingPlace, setMeetingPlace] = useState("");
  const [memberMax, setMemberMax] = useState(0);
  const [memberCnt, setMemberCnt] = useState(0);
  const [meetingDate, setMeetingDate] = useState("");
  const [placeDetail, setPlaceDetail] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  var loc = {latitude: lat, longitude: lng};

  // let meetingDesc = route.params.meetingDesc;
  // let meetingImg = route.params.img;
  // let meetingName = route.params.title;
  // let meetingPlace = route.params.place;
  // let memberMax = route.params.maxMember;
  // let memberCnt = route.params.numMember;
  // let meetingDate = route.params.date;
  // let placeDetail = route.params.placeDetail;
  // let lat = route.params.lat;
  // let lng = route.params.lng;
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};

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

  // 모임 가입하기 버튼 누르면 뜨는 알럿창
  function alertJoinMeeting() {
    Alert.alert( 
      "", 
      "모임에 가입할까요?", 
      [ 
        { text: '아니오'}, 
        { text: '네', onPress: () => { 
          joinMeeting();
        }} 
      ], 
      { cancelable: true } 
    ); 

  }

  // 알럿창에서 네!를 누르면 가입ㄱㄱ
  const joinMeeting = async () => {
    try {
      await axiosInstance.post("/meetings", {
        userId: userId,
        meetingId: meetingId,
        isLeader: false,
      })
        .then(async (response) => {
          if (response.status === 200) {
            console.log(response); 
          } else {
            console.log(response);
          }
        })
        .catch((response) => { console.log(response); });
    } catch (err) { console.log(err); }
  };

  //모임 정보 세팅
  useEffect(() => {
    getMeetingById(meetingId);
  }, [isFocused]);

  async function getMeetingById(meetingId) {
    try {
        await axiosInstance.get("/meetings/"+meetingId)
            .then((response) => {
                if (response.status === 200) {
                    console.log("[모임 정보 조회 성공] : "+meetingId);
                    console.log(response.data);
                    setMeetingDesc(response.data.meetingDesc);
                    setMeetingImg(response.data.meetingImg);
                    setMeetingName(response.data.meetingName);
                    setMeetingPlace(response.data.meetingPlace);
                    setMemberMax(response.data.memberMax);
                    setMemberCnt(response.data.memberCnt);
                    setMeetingDate(response.data.meetingDate);
                    setPlaceDetail(response.data.placeDetail);
                    setLat(response.data.lat);
                    setLng(response.data.lng);
                } else {
                    console.log("[모임 정보 조회 실패] : "+meetingId);
                }
            })
            .catch((response) => { console.log(response); });
    } catch (err) { console.log(err); }
  };


    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{ uri : meetingImg}}
            />
            <View style={{marginHorizontal:25}}>
              <Text style={styles.title}>{meetingName}</Text>
              <Text style={styles.text}>{meetingDesc}</Text>
              <View style={styles.row}>
                <Icon name='location-outline' size={20} color='#313333' />
                <Text style={styles.subtitle}>장소</Text>
                <Text style={styles.subtext}>{meetingPlace}</Text>
              </View>
              <View style={styles.row}>
                <Icon name='person-outline' size={20} color='#313333' />
                <Text style={styles.subtitle}>모집인원</Text>
                <Text style={styles.subtext}>{memberCnt} / {memberMax}</Text>
              </View>
              <View style={styles.row}>
                <Icon name='ios-calendar-sharp' size={20} color='#313333' />
                <Text style={styles.subtitle}>날짜</Text>
                <Text style={styles.subtext}>{parse(meetingDate)}</Text>
              </View>

              <View style={styles.tempMap}>
              <NaverMapView
                  style={{width: '100%', height: '100%'}} 
                  showsMyLocationButton={true}
                  center={{...loc, zoom: 15}}>
                  <Marker coordinate={loc} pinColor="green"/>
              </NaverMapView>
              </View>
            </View>
            {/* <View style={[styles.row, {marginBottom:50}]}>
              <Text style={[{color: '#313333'},{fontWeight: 'bold'}, {marginRight:20}]}>상세주소</Text>
              <Text>{placeDetail}</Text>
            </View> */}

          </View>
        </ScrollView>

        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => alertJoinMeeting()}>
          <Text style={styles.buttonText}>모임 가입하기</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom:50
  },
  title: {
    fontSize: 20,
    marginTop: 25,
    color: '#313333',
    fontWeight: 'bold',
  },
  row: {
    alignItems:"center",
    flexDirection:"row",
    marginTop: 15,
  },
  subtitle: {
    width:65,
    fontSize: 15,
    color: '#313333',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subtext: {
    fontSize: 14,
    marginLeft: 50,
    color: "#545454"
  },
  button: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: "100%",
    height: 55,
    backgroundColor: "#1BE58D",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 18,
    color: "#fff"
  },
  text: {
    fontSize: 15,
    marginTop: 15,
    lineHeight : 22,
    marginBottom: 15,
    color: "#313333"
  },
  image: {
    height : 220,
  },
  tempMap: {
    alignItems:'center',
    justifyContent:'center',
    height : 220,
    marginTop: 40,
    marginBottom:50
  },
  disButton: {
    height: 55,
    backgroundColor: "#aaaaaa",
    justifyContent: "center",
    alignItems: "center"
  },
});

export default MeetingDetail;