import React, { Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import { LogBox , SafeAreaView, StyleSheet, Text, View, FlatList, Image, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Align } from '../plogging/map';
import { TouchableHighlight } from 'react-native-gesture-handler';


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
    flex:1,
    borderRadius: 8,
    marginBottom: 20,
    marginLeft: 20,
    paddingBottom: 10,
    paddingRight: 10,
  },
  elevation: {
    elevation: 5,
    shadowColor: '#bbbbbb',
  },
  img: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginRight: -10,
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
    fontSize: 13,
    marginLeft: 7
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
  }
});

const data = [
  {
    meetingId: 1,
    meetingImg: 'https://i.postimg.cc/Jzt7P8MJ/img-82377-1.jpg',
    meetingName: '같이 석촌호수 도실분~!',
    meetingPlace: '석촌호수',
    memberMax: 4,
    memberCnt: 2,
    meetingDate: '4월 28일(목) 14:00',
  },
  {
    meetingId: 2,
    meetingImg: 'https://i.postimg.cc/HLpSbynz/test6.jpg',
    meetingName: '주말 플로깅 하실 분',
    meetingPlace: '석촌호수',
    memberMax: 6,
    memberCnt: 2,
    meetingDate: '4월 30일(토) 15:00',
  },
  {
    meetingId: 3,
    meetingImg: 'https://i.postimg.cc/dVRH7BsD/test3.jpg',
    meetingName: '야경 보면서 돌아요',
    meetingPlace: '석촌호수',
    memberMax: 5,
    memberCnt: 4,
    meetingDate: '4월 29일(금) 19:00',
  },
  {
    meetingId: 4,
    meetingImg: 'https://i.postimg.cc/4N9FGGj6/test5.jpg',
    meetingName: '운동 겸 플로깅 하실 분을 모십니당',
    meetingPlace: '석촌호수',
    memberMax: 5,
    memberCnt: 5,
    meetingDate: '5월 1일(일) 13:00',
  },
  {
    meetingId: 5,
    meetingImg: 'https://i.postimg.cc/rmZYVw8J/test4.jpg',
    meetingName: '벚꽃 구경해요',
    meetingPlace: '석촌호수',
    memberMax: 5,
    memberCnt: 1,
    meetingDate: '4월 29일(금) 15:00',
  },
  {
    meetingId: 6,
    meetingImg: 'https://i.postimg.cc/4yrLc2HH/test2.jpg',
    meetingName: '저희집 강아지 보실 분',
    meetingPlace: '석촌호수',
    memberMax: 7,
    memberCnt: 7,
    meetingDate: '4월 29일(금) 16:00',
  },
  {
    meetingId: 7,
    meetingImg: 'https://i.postimg.cc/4N9FGGj6/test5.jpg',
    meetingName: '쓰줍쓰줍 쓰레기를 줍자',
    meetingPlace: '석촌호수',
    memberMax: 5,
    memberCnt: 4,
    meetingDate: '4월 29일(금) 19:00',
  },
  {
    meetingId: 8,
    meetingImg: 'https://i.postimg.cc/Jzt7P8MJ/img-82377-1.jpg',
    meetingName: '저희집 강아지 보실 분',
    meetingPlace: '석촌호수',
    memberMax: 5,
    memberCnt: 4,
    meetingDate: '4월 29일(금) 19:00',
  },
  
];


const Home = () => {
  const navigation = useNavigation();

  const Item = ({ id, img, title, place, numMember, maxMember, date, index}) => (
    <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => navigation.navigate('MeetingDetail')}
    style={[ index%2===0? {marginRight:20} : {marginRight:0}, styles.card, styles.elevation]}>
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
    date={item.meetingDate}
    id = {item.meetingId}
    index = {item.meetingId} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.row, {marginLeft:20}, {marginBottom:10}, {marginTop:10}]}>
        <Chip style={{marginRight:10}} icon="map-marker" mode="outlined" selectedColor="#232732" onPress={() => console.log('지역')}>지역</Chip>
        <Chip style={{marginRight:10}} icon="clock" mode="outlined" selectedColor='#232732' onPress={() => console.log('일정')}>일정</Chip>
        <Chip icon="align-vertical-center" mode="outlined" selectedColor='#232732' onPress={() => console.log('정렬')}>정렬</Chip>
      </View>
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.meetingId}
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