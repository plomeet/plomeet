import { useState, useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { color} from '../styles';

import { Linking, View, StyleSheet, Button, Alert, Dimensions} from "react-native";
import {TouchableOpacity, Text} from "react-native";

import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import InsideRoom from './inside_room';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

import {
  ChattingRoomComp,
  ChattingRoomImg,

} from '../list/styles';
import axiosInstance from '../../../../utils/API';
import { FlatList } from 'react-native-gesture-handler';
import { leaveMember } from '../../../../utils/firestore';

//모임탈퇴(내가 운영중인 모임)
import AsyncStorage from '@react-native-community/async-storage';
const Drawer = createDrawerNavigator();





function HeaderR() {
    return ( <Ionicons name="notifications-outline"size={30}></Ionicons>);
   
}

const DrawerNavigator = (props) => {  //const DrawerNavigator = ({item}) => {  
  const meeting = props.data.route.params.meeting;
  const userId = props.data.route.params.userId;
  const meetingId = meeting.meetingId;
  const [imLeaderList, setImLeaderList] = useState([]);
  const windowHeight = Dimensions.get('window').height;
  const toastRef = useRef(); // toast ref 생성

  //모임 정보 세팅
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
  useEffect(() => {
    AsyncStorage.getItem('imLeaderList', (err, result) => {
      setImLeaderList(JSON.parse(result));
    })
    getMeetingById(meetingId);
  }, []);

  const [meetingUser, setMeetingUser]= useState([
    {
      nick:"",
      id:"",
      img:"",
      isLeader:""
    }
  ]);

    // 윤수 추가 : 채팅방에 멤버 띄우는 함수
    const getMeetingUsers = async() => {  //meetingId
      const list =[];
      //var meetingUsers = [];  //[];
      try {
          await axiosInstance.get(`/chat/${meetingId}`)
              .then((response) => {
                  //console.log(response.data[0].userId)
                  if (response.status === 200) {
                      const meetingUsers = response.data;
                      for(let i =0;i<meetingUsers.length;i++){

                        const userDetail = {
                          id: meetingUsers[i].userId,
                          nick: meetingUsers[i].userNickName,
                          img: meetingUsers[i].userProfileImg,
                          isLeader: meetingUsers[i].isLeader,
                        };
                        list.push(userDetail)
                      }
                      //console.log(meetingUsers);
  
                  } else {
                      console.log("error");
                  }
              })
              .catch((response) => { console.log(response); });
      } catch (err) { console.log(err); }
      //console.log(meetingUsers);
      setMeetingUser(list);
    }

    function amiLeader(){
      if(imLeaderList.indexOf(Number(meetingId))>-1){
        console.log("운영중인 모임은 탈퇴할 수 없습니다.")
        Alert.alert(
          "",
          "운영중인 모임은 탈퇴할 수 없습니다.",[
            {text:"확인"},
        ]
        )
      }else {
        Alert.alert(
          "모임탈퇴",
          "채팅방을 나가면 모임에서도 탈퇴됩니다.\n정말 나가시겠습니까?",[
            {text:"남을게요"},
            {text:"그래도 나갈래요",onPress:()=>leave()}
        ]
        )
      }
    }

    function leave() {
      leaveMyMeeting() //backend 탈퇴로직
      updateMeeting() //모임 인원 수 반영
      leaveChattingRoom(); //firestore
    }

    const leaveChattingRoom = async() => {
      await leaveMember({meetingId, userId});
      navigation.navigate('채팅 목록');
    }

    async function leaveMyMeeting() {
      try {
        await axiosInstance.delete("/meetings/"+meetingId+"/"+userId)
          .then((response) => {
            if (response.status === 200) {
              setMeetingList(response.data);
              console.log("[모임 탈퇴 성공]");
            } else {
              console.log("[모임 탈퇴 실패]");
            }
          })
          .catch((response) => { console.log(response); });
      } catch (err) { console.log(err); }
    }

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
          memberCnt: memberCnt-1,
          meetingDate: meetingDate,
          item: item,
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
  
    function sendEmail() {
      Linking.openURL('mailto:plomeet205@gmail.com?subject=[게시물 신고]&body=*스크린샷 첨부 시 신고 처리가 빨라집니다.\n*아래 양식을 맞춰 보내주세요.\n\n채팅방 제목 : \n신고 닉네임 : \n신고 사유 : \n스크린샷(선택) : ')
    }
  
  // 윤수가 추가함 
    const navigation = useNavigation();
    useEffect(()=>{
        //getMeetingUsers();      // 기본적으로 webhook 실행 
        navigation.setOptions({
            headerTitle: meeting.meetingName,//title,
            headerRight: () => (
              <Icon onPress = {()=> {
                navigation.dispatch(DrawerActions.openDrawer());
                getMeetingUsers(); 
                //console.log({meetingUser})
              } } 
                name="menu" size={20} color={color.black} style={{marginRight: 10}} />
          ),
        });
    }, []);

    const Item =({title,img, isLeader})=>(
      <View >
        <ChattingRoomComp>
          <ChattingRoomImg source={{uri: img}} />
            <Text style={{fontSize: 15, marginTop:15, marginLeft:20}}>
              {title}
            </Text>
            {isLeader 
            ? <Icon name="crown" size={15} color={color.crownYellow} style={{marginTop:17, marginLeft:5}}/>
            : null
            }
        </ChattingRoomComp>
      </View>
    );

    // 원래 코드 제일 위에 위치한, 아무데도 안속하던 customDrawer 여기로 끌고온거 
    const CustomDrawer = props => {
      const mt = {meetingUser}.meetingUser

      const renderItem = ({ item }) => {
        return (
          <Item title={item.nick} img={item.img} isLeader={item.isLeader}/>
        );
      }
        return(
            <View style={{ flex: 1 }}>
            <View {...props}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 15,
                  marginBottom: 10,
                }}
              >
                
                  <Text style={[{fontSize: 20}, {marginLeft:10}, {color:"#000"}, {marginTop:20}, {marginBottom:-10}]}>
                    모임인원
                  </Text>
                
              </View>
  
              <FlatList
                    data={mt}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    >
              </FlatList>

            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                left: 10,
                bottom: 80,//280,
                backgroundColor: 'lightgray', //'#1BE58D', //'#009DAE',
                padding: 10,
                borderRadius: 20
              }}
              onPress={() => sendEmail()}>
              <Text style = {styles.logoutText}>신고하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                left: 10,
                bottom: 30,//280,
                backgroundColor: '#12D3DD', //'#1BE58D', //'#009DAE',
                padding: 10,
                borderRadius: 20
                
              }}onPress={() => amiLeader()}
              
            >
              <Text style = {styles.logoutText}>나가기</Text>
              
            </TouchableOpacity>
          </View>
        );
    }

    return (
        <Drawer.Navigator screenOptions={{
          drawerPosition: "right",
          headerShown: false,
        }}
        drawerContent={props => <CustomDrawer {...props} /> } 
        >
          <Drawer.Screen name='Menu' component={InsideRoom} initialParams={{meeting:meeting}}/>
        </Drawer.Navigator >
    );

}   

export function SideBar_(props){
    return (
        <DrawerNavigator data={props} />
    );
}

const styles = StyleSheet.create({
    logoutBox: {
      //position: 'absolute',
      flex: 1,
      width:200,
      height:0,
      backgroundColor: '#009DAE',
    },
    logoutText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      //marginLeft: 30
    }
})
