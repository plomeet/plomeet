import React, { Component, Node, useEffect, useState, useRef, useCallback } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Alert, TextInput, Button, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity, Dimensions  } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import { Chip } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "../plogging/map";
import { ScrollView } from 'react-native-gesture-handler';
import axiosInstance from '../../../utils/API';
import { useSelector } from 'react-redux';
import { joinMember } from '../../../utils/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-easy-toast';

const MeetingDetail = ({route}) => {
  const isFocused = useIsFocused();
  
  const userId = useSelector(state => state.userId)
  const meetingId = route.params.meetingId;
  const myMeetingList = route.params.myMeetingList;
  const [meetingDesc, setMeetingDesc] = useState("");
  const [meetingImg, setMeetingImg] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [meetingPlace, setMeetingPlace] = useState("");
  const [memberMax, setMemberMax] = useState(0);
  const [memberCnt, setMemberCnt] = useState(0);
  const [meetingDate, setMeetingDate] = useState("");
  const [placeDetail, setPlaceDetail] = useState("");
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  var loc = {latitude: lat, longitude: lng};
  const [joinDisable, setJoinDisable] = useState(true);
  const windowHeight = Dimensions.get('window').height;
  const toastRef = useRef(); // toast ref 생성
  const [btnText, setBtnText] = useState("모임 가입하기");
  const [isFirstMeeting, setIsFirstMeeting] = useState(false);
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

  useEffect(() => {
    console.log("[내가 참여한 모임인지 아닌지 여부 확인]");
    if(myMeetingList.indexOf(meetingId) < 0){
      console.log("불포함!!!!!!");
      setJoinDisable(false);
    }
    else {
      console.log("포함!!!!!!!");
      setJoinDisable(true);
      setBtnText("가입중인 모임");
    }
  }, [meetingId, myMeetingList]);


  // 모임 가입하기 버튼 누르면 뜨는 알럿창
  function alertJoinMeeting() {
    Alert.alert( 
      "", 
      "모임에 가입할까요?", 
      [ 
        { text: '아니오'}, 
        {
          text: '네', onPress: () => { 
          if (isFirstMeeting) {
            saveBadge(); //뱃지 획득 alert뜨고서 toast 뜨게 처리
          }
          else showCopyToast();
          joinMeeting();
          setJoinDisable(true);
          setMemberCnt(memberCnt+1);
          setBtnText("가입중인 모임");
        }}
      ], 
      { cancelable: true } 
    ); 

  }

  //토스트
  const showCopyToast = useCallback(() => {
      toastRef.current.show('모임에 가입되었습니다.');
  }, []);

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
            updateMeeting();
            const meetingIdStr = meetingId.toString();
            const userIdStr = userId.toString();
            joinMember({meetingId: meetingIdStr, userId: userIdStr, lastChatTime: Date.now()});
          } else {
            console.log(response);
          }
        })
        .catch((response) => { console.log(response); });
    } catch (err) { console.log(err); }

  };

  const updateMeeting = async () => {
    try {
      await axiosInstance.put("/meetings/"+ meetingId, {
        meetingImg: meetingImg,
        meetingDesc: meetingDesc,
        meetingName: meetingName,
        meetingPlace: meetingPlace,
        meetingPlaceDetail: placeDetail,
        lat: lat,
        lng: lng,
        memberMax: memberMax,
        memberCnt: memberCnt+1,
        meetingDate: meetingDate,
        item: item,
      })
        .then(async (response) => {
          if (response.status === 200) {
            console.log(response);
            setMemberCnt(memberCnt+1);
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
                    setPlaceDetail(response.data.meetingPlaceDetail);
                    setLat(response.data.lat);
                    setLng(response.data.lng);
                    setItem(response.data.item);
                    setItems(response.data.item.split('&'));
                    console.log(items);
                    if(response.data.memberMax == response.data.memberCnt){
                      setJoinDisable(true);
                      setBtnText("마감된 모임");
                    }
                } else {
                    console.log("[모임 정보 조회 실패] : "+meetingId);
                }
            })
            .catch((response) => { console.log(response); });
    } catch (err) { console.log(err); }
  };

  useEffect(() => { 
    //첫 모임 가입인지 확인
    const checkFirstMeeting = async () => { 
      try {
        await axiosInstance.get(`/badges/${userId}/1`)
          .then((response) => {
            if (response.status === 200) {
              console.log("뱃지!!!!", response.data.isOwned)
              if (!response.data.isOwned) {
                setIsFirstMeeting(true);
                console.log("나 첫뱃지임!")
              }
              else {
                setIsFirstMeeting(false);
              }
            } else {
              console.log("error" + response.status);
            }
          })
      }
      catch (err) {
        console.log(err);
      }
  }
  checkFirstMeeting();
  }, [isFocused])

  const saveBadge = async () => { 
    try {
        await axiosInstance.post('/badges/get', {
            userId: userId,
            badgeId: 1,
        }).then((response) => {
            if (response.status === 201) {
              console.log("뱃지 획득 성공!!");
              setIsFirstMeeting(true)
            }
        })
    } catch (error) {console.log(error)}

    console.log("첫플로깅이냐???", isFirstMeeting)
      if (isFirstMeeting) {
        Alert.alert( 
          "", 
          "'모임의 시작' 뱃지 획득!", 
          [ 
            {
              text: '닫기', onPress: () => { 
              showCopyToast();
            }}
          ], 
          { cancelable: true } 
        ); 

        setIsFirstMeeting(false);
      }
  }
  
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
                <Icon2 name='calendar' size={17} style={[{marginLeft:2}, {marginRight:1}]} color='#313333' />
                <Text style={styles.subtitle}>날짜</Text>
                <Text style={styles.subtext}>{parse(meetingDate)}</Text>
              </View>
              <View style={styles.row}>
                <Icon2 name='magnifier-add' size={17} style={[{marginLeft:2}, {marginRight:1}]} color='#313333' />
                <Text style={styles.subtitle}>주소</Text>
                <Text style={styles.subtext}>{placeDetail}</Text>
              </View>
              <View style={[styles.row, {marginTop : 20}]}>
                <Icon2 name='bag' size={20} color='#313333' />
                <Text style={[styles.subtitle, {marginRight:30}]}>준비물</Text>
                {items[0] !== undefined && <View style={styles.itemChip}><Text style={{color:"#fff"}}>{items[0]}</Text></View>}
                {items[1] !== undefined && <View style={styles.itemChip}><Text style={{color:"#fff"}}>{items[1]}</Text></View>}
                {items[2] !== undefined && <View style={styles.itemChip}><Text style={{color:"#fff"}}>{items[2]}</Text></View>}
              </View>
              <View style={[styles.row, { marginLeft: 125 }, { marginTop: 7 }]}>
                {items[3] !== undefined && <View style={styles.itemChip}><Text style={{color:"#fff"}}>{items[3]}</Text></View>}
                {items[4] !== undefined && <View style={styles.itemChip}><Text style={{color:"#fff"}}>{items[4]}</Text></View>}
                {items[5] !== undefined && <View style={styles.itemChip}><Text style={{color:"#fff"}}>{items[5]}</Text></View>}
                {items[6] !== undefined && <View style={styles.itemChip}><Text style={{color:"#fff"}}>{items[6]}</Text></View>}
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
        <Toast ref={toastRef}
             positionValue={windowHeight * 0.55}
             fadeInDuration={200}
             fadeOutDuration={1000}
             style={{backgroundColor:"#1BE58D"}}
        />

        <TouchableOpacity activeOpacity={0.8} disabled={joinDisable} style={joinDisable? styles.disButton :styles.button} onPress={() => alertJoinMeeting()}>
          <Text style={styles.buttonText}>{btnText}</Text>
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
    marginTop: 18,
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
    marginLeft: 30,
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
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: "100%",
    height: 55,
    backgroundColor: "#aaaaaa",
    justifyContent: "center",
    alignItems: "center"
  },
  itemChip : {
    backgroundColor: "#1BE58D",
    borderRadius: 20,
    paddingHorizontal:12,
    paddingVertical: 5,
    marginHorizontal: 3
  }
});

export default MeetingDetail;