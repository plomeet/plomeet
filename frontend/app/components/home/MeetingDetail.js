import React, { Component, Node } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TextInput, Button, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity  } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


const meetingDetail = () => {
  const navigation = useNavigation();

    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri :'https://i.postimg.cc/HLpSbynz/test6.jpg'}}
        />
        <Text style={styles.title}>모임 제목 블라블라</Text>
        <Text style={styles.text}>석촌호수 근처에 사시는 분들 날씨도 좋은데 주말에 벚꽃보면서 플로깅해요~~!! 쓰봉은 제가 준비해 가겠습니다. 몸만 오세여~~! 점심 먹고 오셔야해요 따로 점심 안 먹습니다! {"\n"}{"\n"}준비물 : 편한 운동화, 석촌호수 한바퀴 뛸 수 있는 체력</Text>
        <View style={styles.row}>
          <Icon name='location' size={25} color='#313333' />
          <Text style={styles.subtitle}>장소</Text>
          <Text style={styles.subtext}>석촌호수</Text>
        </View>
        <View style={styles.row}>
          <Icon name='location' size={25} color='#313333' />
          <Text style={styles.subtitle}>모집인원</Text>
          <Text style={styles.subtext}>4 / 5</Text>
        </View>
        <View style={styles.row}>
          <Icon name='location' size={25} color='#313333' />
          <Text style={styles.subtitle}>날짜</Text>
          <Text style={styles.subtext}>5월 12일(목) 18:00</Text>
        </View>

        <View style={styles.tempMap}><Text>지도</Text></View>


        <View style={{flex:1}}/>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    color: '#313333',
    fontWeight: 'bold',
  },
  row: {
    alignItems:"center",
    flexDirection:"row",
    marginTop: 15,
  },
  subtitle: {
    width:70,
    fontSize: 16,
    color: '#313333',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  subtext: {
    fontSize: 15,
    marginLeft: 50,
    color: "#545454"
  },
  button: {
    height: 55,
    backgroundColor: "#1BE58D",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
    color: "#313333"
  },
  image: {
    height : 180,
    marginTop: 20,
    borderRadius: 10,
  },
  tempMap: {
    borderWidth: 1,
    alignItems:'center',
    justifyContent:'center',
    height : 200,
    marginTop: 30,
  }
});

export default meetingDetail;