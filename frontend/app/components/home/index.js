import React, { Component, Node, Button, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { LogBox , SafeAreaView, Modal, StyleSheet, Text, View, FlatList, Image, StatusBar, TouchableOpacity, BackHandler } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Align } from '../plogging/map';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axiosInstance from '../../../utils/API';

LogBox.ignoreAllLogs();

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
});

// const data = [
//   {
//     meetingId: 1,
//     meetingImg: 'https://i.postimg.cc/Jzt7P8MJ/img-82377-1.jpg',
//     meetingName: '같이 석촌호수 도실분~!',
//     meetingPlace: '석촌호수',
//     memberMax: 4,
//     memberCnt: 2,
//     meetingPlaceDetail: "서울 송파구 잠실동 석촌호수",
//     lat : 37.50606,
//     lng : 127.10094,
//     detail: "석촌호수 근처에 사시는 분들 날씨도 좋은데 주말에 벚꽃보면서 플로깅해요~~!! 쓰봉은 제가 준비해 가겠습니다. 몸만 오세여~~! 점심 먹고 오셔야해요 따로 점심 안 먹습니다! \n \n준비물 : 편한 운동화, 석촌호수 한바퀴 뛸 수 있는 체력",
//     meetingDate: '4월 28일(목) 14:00',
//   },
//   {
//     meetingId: 2,
//     meetingImg: 'https://i.postimg.cc/HLpSbynz/test6.jpg',
//     meetingName: '주말 플로깅 하실 분',
//     meetingPlace: '석촌호수',
//     memberMax: 6,
//     memberCnt: 2,
//     meetingPlaceDetail: "서울 송파구 잠실동 석촌호수",
//     lat : 37.58606,
//     lng : 127.20394,
//     detail: "주말에 플로깅 하실 분 구합니다~~~! 밥은 먹고 모여요!!!!",
//     meetingDate: '4월 30일(토) 15:00',
//   },
//   {
//     meetingId: 3,
//     meetingImg: 'https://i.postimg.cc/dVRH7BsD/test3.jpg',
//     meetingName: '야경 보면서 돌아요',
//     meetingPlace: '석촌호수',
//     memberMax: 5,
//     memberCnt: 4,
//     meetingPlaceDetail: "서울 송파구 잠실동 석촌호수",
//     lat : 37.50806,
//     lng : 127.10014,
//     meetingDate: '4월 29일(금) 19:00',
//     detail: "불금에 야경보면서 쓰줍하실 분 구합니당 \n혹시라도 비오면 취소됩니다~~!",
//   },
//   {
//     meetingId: 4,
//     meetingImg: 'https://i.postimg.cc/4N9FGGj6/test5.jpg',
//     meetingName: '운동 겸 플로깅 하실 분을 모십니당',
//     meetingPlace: '석촌호수',
//     memberMax: 5,
//     memberCnt: 5,
//     meetingPlaceDetail: "서울 송파구 잠실동 석촌호수",
//     lat : 37.58606,
//     lng : 127.12094,
//     meetingDate: '5월 1일(일) 13:00',
//     detail : "요즘 제가 석촌호수 걸으면서 운동을 하고 있는데요 \n쓰레기가 많이 보이더라구요... \n같이 쓰레기 주우면서 운동하실 분 구합니다!!!! \n근데 요즘 석촌호수에 사람 엄청 많아서... 영 아니다 싶으면 근처 다른 장소로 바뀔 수도 있어요 채팅방에서 이야기 해봐요~~",
//   },
//   {
//     meetingId: 5,
//     meetingImg: 'https://i.postimg.cc/rmZYVw8J/test4.jpg',
//     meetingName: '벚꽃 구경해요',
//     meetingPlace: '석촌호수',
//     memberMax: 5,
//     memberCnt: 1,
//     meetingPlaceDetail: "서울 송파구 잠실동 석촌호수",
//     lat : 37.55606,
//     lng : 127.10394,
//     meetingDate: '4월 29일(금) 15:00',
//     detail : "쓰레기도 줍고 벚꽃 구경도 하고^^ \n같이 벚꽃 구경할 친구 없는 사람 모여라",
//   },
//   {
//     meetingId: 6,
//     meetingImg: 'https://i.postimg.cc/4yrLc2HH/test2.jpg',
//     meetingName: '저희집 강아지 보실 분',
//     meetingPlace: '석촌호수',
//     memberMax: 7,
//     memberCnt: 7,
//     meetingPlaceDetail: "서울 송파구 잠실동 석촌호수",
//     lat : 37.52606,
//     lng : 127.11094,
//     meetingDate: '4월 29일(금) 16:00',
//     detail : "저희집 강아지가 진짜 귀여운데요.... 웰시코기인데요..... 진짜 짱인데요..... 이름은 절미구요...... 같이 강아지 산책시키면서 쓰레기 주우실 분...... 강아지랑 같이 나오셔도 돼요......",
//   },
//   {
//     meetingId: 7,
//     meetingImg: 'https://i.postimg.cc/4N9FGGj6/test5.jpg',
//     meetingName: '쓰줍쓰줍 쓰레기를 줍자',
//     meetingPlace: '석촌호수',
//     memberMax: 5,
//     memberCnt: 4,
//     meetingPlaceDetail: "서울 송파구 잠실동 석촌호수",
//     lat : 37.55606,
//     lng : 127.10094,
//     meetingDate: '4월 29일(금) 19:00',
//     detail : "얍",
//   },
//   {
//     meetingId: 8,
//     meetingImg: 'https://i.postimg.cc/Jzt7P8MJ/img-82377-1.jpg',
//     meetingName: '저희집 강아지 보실 분',
//     meetingPlace: '석촌호수',
//     memberMax: 5,
//     memberCnt: 4,
//     meetingPlaceDetail: "서울 송파구 잠실동 석촌호수",
//     lat : 37.50806,
//     lng : 127.13294,
//     meetingDate: '4월 29일(금) 19:00',
//     detail : "얍",
//   },
// ];


const Home = () => {
  const navigation = useNavigation();
  const [meetingList, setMeetingList] = useState([]);
  const isFocused = useIsFocused();
  const current= getToday(); //오늘 날짜
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const [selectedDate, setSelectedDate] = useState('일시'); //일정 필터
  const [visibleCalendar, setVisibleCalendar] = useState(false); //캘린더 표시 여부

  function deleteDate(){
    setSelectedDate('일시');
    setVisibleCalendar(false);
    getAllMeeting();
  }

  function setDate(){
    for(var i=0; i<meetingList.length; i++){
      if(parse(meetingList[i].meetingDate).substring(0,11)!=selectedDate) {
        meetingList.splice(i, 1);
        i--;
      }
    }
    setVisibleCalendar(false)
  }
  function parse(str) {
    var y = str.substr(0, 4);
    var m = str.substr(5, 2);
    var d = str.substr(8, 2);
    var ymd = new Date(y,m-1,d);
    let day = week[ymd.getDay()];
    var res = m+"월 "+d+"일("+day+") "+ str.substr(11, 5)
    return res
  }

  //모임 정보 세팅
  useEffect(() => {
    getAllMeeting();
  }, [isFocused]);

  async function getAllMeeting() {
    try {
        await axiosInstance.get("/meetings/all")
            .then((response) => {
                if (response.status === 200) {
                    setMeetingList(response.data);
                    console.log("[모임 정보 조회 성공]");
                } else {
                    console.log("[모임 정보 조회 실패]]");
                }
            })
            .catch((response) => { console.log(response); });
    } catch (err) { console.log(err); }
  };


  const Item = ({ meetingId, meetingDesc, img, title, place, numMember, maxMember, date, index, lat, lng, placeDetail}) => (
    <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => navigation.navigate('MeetingDetail', {meetingId:meetingId})}
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

  return (
    <SafeAreaView style={styles.container}>

        <Modal animationType="slide" 
          transparent={false}
          activeOpacity={0.8} 
          visible={visibleCalendar}> 
          <View style={{ 
            flex: 1, 
            marginHorizontal : 30,
            justifyContent: 'center', 
            alignItems: 'center'}}>

            <DatePicker
            options={{
              mainColor: '#1BE58D',
              borderColor: 'rgba(122, 146, 165, 0.1)',
            }}
            mode="calendar"
            configs={{
              dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
              monthNames: [
                "1월",
                "2월",
                "3월",
                "4월",
                "5월",
                "6월",
                "7월",
                "8월",
                "9월",
                "10월",
                "11월",
                "12월",
              ],
            }}
            minimumDate= {current}
            style={{ borderRadius: 10 }}
            onSelectedChange={date => setSelectedDate(parse(date))}
            />
            <View style={styles.row}>
              <TouchableOpacity activeOpacity={0.8} style={[styles.deleteButton, {paddingHorizontal:30}]} onPress={() => deleteDate()}><Text style={styles.deleteButtonText}>조건 삭제</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={[styles.closeButton, {paddingHorizontal:30}]} onPress={() => setDate()}><Text style={styles.buttonText}>선택</Text></TouchableOpacity>
            </View>
          </View> 
        </Modal>

      <View style={[styles.row, {marginLeft:20}, {marginBottom:10}, {marginTop:10}]}>
        <Chip style={{marginRight:10}} icon="map-marker" mode="outlined" selectedColor="#232732" onPress={() => console.log('지역')}>지역</Chip>
        <Chip style={{marginRight:10}} icon="clock" mode="outlined" selectedColor='#232732' onPress={()=> setVisibleCalendar(true)}>{selectedDate}</Chip>
        <Chip icon="align-vertical-center" mode="outlined" selectedColor='#232732' onPress={() => console.log('정렬')}>정렬</Chip>
      </View>
      <FlatList
        columnWrapperStyle={[{justifyContent: 'space-between'}, {marginHorizontal:20}]}
        data={meetingList}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.meetingId}
        windowSize={3}
        numColumns = {2}
      />
      <TouchableOpacity onPress={() => navigation.navigate('OpenMeeting')} activeOpacity={0.5} style= {styles.TouchableOpacityStyle} >
        <Image source={{ uri: 'https://i.postimg.cc/v8p4fK53/plus-btn.png' }}
          style={styles.FloatingButtonStyle}/>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Home;