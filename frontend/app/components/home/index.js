import React, { Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Card, Image, StatusBar  } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Align } from '../plogging/map';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
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
    width : '47%',
    // padding: 20,
    borderRadius: 8,
    marginVertical: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  elevation: {
    elevation: 10,
    shadowColor: '#969696',
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

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ img, title, place, numMember, maxMember, date}) => (
  <View style={[styles.card, styles.elevation]}>
    <Image source={{uri: img}} style={styles.img} />
    <Text style={styles.title}>{title}</Text>
    <View style={styles.row}>
      <Icon name='person-outline' size={14} color='#292D32' />
      <Text style={styles.content}>{numMember}/{maxMember}</Text>
      <Icon style={{marginLeft:15}} name='location' size={14} color='#292D32' />
      <Text style={styles.content}>{place}</Text>
    </View>
    <View style={styles.row}>
    <Icon name='md-calendar-sharp' size={14} color='#292D32' />
      <Text style={styles.content}>{date}</Text>
    </View>
    
  </View>
);

const App = () => {
  const renderItem = ({ item }) => (
    <Item 
    img = {item.meetingImg}
    title={item.meetingName}
    place={item.meetingPlace}
    numMember={item.memberCnt}
    maxMember={item.memberMax}
    date={item.meetingDate} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.meetingId}
        numColumns = {2}
      />
    </SafeAreaView>
  );
}

export default App;