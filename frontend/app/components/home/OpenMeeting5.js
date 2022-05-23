import React, { Component, Node, useEffect, useState, useRef, useCallback } from 'react';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import { StyleSheet, Text, View, Dimensions, TextInput, Image, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "../plogging/map";
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import axiosInstance from '../../../utils/API';
import Config from 'react-native-config'
import AWS from 'aws-sdk';
import { createMeeting } from '../../../utils/firestore';
import { useSelector } from 'react-redux';


const OpenMeeting5 = () => {
  const navigation = useNavigation();
  const [meetingImgUri, setMeetingImgUri] = useState("https://i.postimg.cc/QtNKqGGJ/default-Meeting-Img.png");
  const [meetingImgFileName, setMeetingImgFileName] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [detail, setDetail] = useState("");
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [meetingPlace, setMeetingPlace] = useState("");
  const [memberMax, setMemberMax] = useState(1);
  // const [memberCnt, setMemberCnt] = useState(1);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingPlaceDetail, setMeetingPlaceDetail] = useState("");
  const [latitude, setLatitude] = useState(37.564362);
  const [longitude, setLongitude] = useState(126.977011);
  var loc = {latitude: latitude, longitude: longitude};
  const userId = useSelector(state => state.userId);

  var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
  });

  AWS.config.update({
    region: 'ap-northeast-2', // 리전이 서울이면 이거랑 같게
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: Config.IDENTITYPOOLID,
    })
  })

  //날짜포멧
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

  const uploadImg = async () => {
    const response1 = await fetch(meetingImgUri)
    const blob = await response1.blob()
    var albumPhotosKey = "meetings/"
    var photoKey = albumPhotosKey + meetingImgFileName;

    var params = { Bucket: 'plomeet-image', Key: photoKey, Body: blob }
    s3.upload(params, function (err, data) {
      if (err) {
        alert('There was an error uploading your photo: ', err.message);
      }
      // data.Location
      // https://plomeet-image.s3.ap-northeast-2.amazonaws.com/photos/1_3C369038-4102-4887-A8DB-43C42E706340.jpg
      // data.Key
      // photos/1_3C369038-4102-4887-A8DB-43C42E706340.jpg
      console.log(data);
    });
  }

  const thisIsMyMeeting = async (mId) => {
    try {
      await axiosInstance.post("/meetings", {
        userId: userId,
        meetingId: mId,
        isLeader: true,
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

  const creatMeeting = async () => {
    uploadImg();
    try {
      await axiosInstance.post("/meetings/host", {
        meetingImg: "https://plomeet-image.s3.ap-northeast-2.amazonaws.com/meetings/"+meetingImgFileName,
        meetingName: meetingName,
        meetingDesc: detail,
        meetingPlace: meetingPlace,
        meetingPlaceDetail: meetingPlaceDetail,
        lat: latitude,
        lng: longitude,
        memberMax: memberMax,
        meetingDate: meetingDate,
        item: item
      })
        .then(async (response) => {
          if (response.status === 200) {
            console.log(response);
            thisIsMyMeeting(response.data.meetingId);
            const userIdStr = userId.toString();
            const meeting = {
              meetingId: response.data.meetingId.toString(),
              createdAt: Date.now(),
              notice: "안녕하세요! "+meetingName+" 방 입니다.",
            };
            createMeeting({meeting, userId: userIdStr});
            navigation.popToTop()
          } else {
            console.log(response);
          }
        })
        .catch((response) => { console.log(response); });
    } catch (err) { console.log(err); }
  };

  useEffect(() => {
    AsyncStorage.getItem('meetingName', (err, result) => {
      console.log(result);
      setMeetingName(result)
    })
    AsyncStorage.getItem('meetingDetail', (err, result) => {
      console.log(result);
      setDetail(result);
    })
    AsyncStorage.getItem('lat', (err, result) => {
      var lat = 0.0;
      lat = Number(Number(result).toFixed(6));
      console.log(lat);
      setLatitude(lat);
    })
    AsyncStorage.getItem('lng', (err, result) => {
      var lng= 0.0;
      lng = Number(Number(result).toFixed(6));
      console.log(lng);
      setLongitude(lng);
    })
    AsyncStorage.getItem('meetingPlace', (err, result) => {
      console.log(result);
      setMeetingPlace(result);
    })
    AsyncStorage.getItem('memberMax', (err, result) => {
      console.log(result);
      setMemberMax(result);
    })
    AsyncStorage.getItem('meetingDate', (err, result) => {
      console.log(result);
      setMeetingDate(result);
    })
    AsyncStorage.getItem('item', (err, result) => {
      console.log(result);
      setItem(result);
      setItems(result.split('&'));
    })
    AsyncStorage.getItem('address', (err, result) => {
      console.log(result);
      setMeetingPlaceDetail(result);
    })
    AsyncStorage.getItem('meetingImgFileName', (err, result) => {
      console.log("meetingImgFileName : " +result);
      if(result) setMeetingImgFileName(result);
    })
    AsyncStorage.getItem('meetingImgUri', (err, result) => {
      console.log("meetingImgUri : " +result);
      if(result) setMeetingImgUri(result);
    })
  }, [])

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{ uri : meetingImgUri}}
            />
            <View style={{marginHorizontal:25}}>
              <Text style={styles.title}>{meetingName}</Text>
              <Text style={styles.text}>{detail}</Text>
              <View style={styles.row}>
                <Icon name='location-outline' size={20} color='#313333' />
                <Text style={styles.subtitle}>장소</Text>
                <Text style={styles.subtext}>{meetingPlace}</Text>
              </View>
              <View style={styles.row}>
                <Icon name='person-outline' size={20} color='#313333' />
                <Text style={styles.subtitle}>모집인원</Text>
                <Text style={styles.subtext}>1 / {memberMax}</Text>
              </View>
              <View style={styles.row}>
                <Icon2 name='calendar' size={17} style={[{marginLeft:2}, {marginRight:1}]} color='#313333' />
                <Text style={styles.subtitle}>날짜</Text>
                <Text style={styles.subtext}>{parse(meetingDate)}</Text>
              </View>
              <View style={styles.row}>
                <Icon2 name='magnifier-add' size={17} style={[{marginLeft:2}, {marginRight:1}]} color='#313333' />
                <Text style={styles.subtitle}>주소</Text>
                <Text style={styles.subtext}>{meetingPlaceDetail}</Text>
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
          </View>
        </ScrollView>
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => creatMeeting()}>
          <Text style={styles.buttonText}>모임 생성하기</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    alignItems:"center",
    flexDirection:"row",
    marginTop: 15,
  },
  inner: {
    flex: 1,
    justifyContent: "space-around"
  },
  input: {
    marginHorizontal: 30,
    fontSize: 15,
    borderBottomWidth: 1
  },
  image: {
    height : 220,
  },
  text: {
    fontSize: 15,
    marginTop: 15,
    lineHeight : 22,
    marginBottom: 15,
    color: "#313333"
  },
  title: {
    fontSize: 20,
    marginTop: 25,
    color: '#313333',
    fontWeight: 'bold',
  },
  tempMap: {
    alignItems:'center',
    justifyContent:'center',
    height : 220,
    marginTop: 40,
    marginBottom:50
  },
  inputBox: {
    marginTop: 20,
    marginHorizontal: 30,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 10,
    textAlignVertical:'top',
    padding: 10,
    height: 150
  },
  button: {
    height: 55,
    backgroundColor: "#1BE58D",
    justifyContent: "center",
    alignItems: "center"
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
    marginLeft: 34,
    color: "#545454"
  },
  buttonText: {
    fontSize: 18,
    color: "#fff"
  },
  itemChip : {
    backgroundColor: "#1BE58D",
    borderRadius: 20,
    paddingHorizontal:12,
    paddingVertical: 5,
    marginHorizontal: 3
  }
});

export default OpenMeeting5;