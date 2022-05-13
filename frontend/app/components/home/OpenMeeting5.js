import React, { Component, Node } from 'react';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View, TextInput, Image, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "../plogging/map";
import { ScrollView } from 'react-native-gesture-handler';

const openMeeting5 = () => {
  const navigation = useNavigation();
  const meetingImg="file:///data/user/0/com.nom.plomeet/cache/rn_image_picker_lib_temp_9949987b-bd3c-4e5d-9528-0241fbdfdd55.jpg";
  const meetingName="망원동 플로깅";
  const detail = "모두 모여 망원 한강공원으로";
  const meetingPlace="한강공원 스벅 앞";
  const memberMax = "10";
  const memberCnt=1;
  const meetingDate ="2022/05/18 09:00";
  const location = {latitude: 37.55459, longitude: 126.89573};

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{ uri : meetingImg}}
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
                <Text style={styles.subtext}>{memberCnt} / {memberMax}</Text>
              </View>
              <View style={styles.row}>
                <Icon name='ios-calendar-sharp' size={20} color='#313333' />
                <Text style={styles.subtitle}>날짜</Text>
                <Text style={styles.subtext}>{meetingDate}</Text>
              </View>

              <View style={styles.tempMap}>
              <NaverMapView
                  style={{width: '100%', height: '100%'}} 
                  showsMyLocationButton={true}
                  center={{...location, zoom: 15}}>
                  <Marker coordinate={location} pinColor="green"/>
              </NaverMapView>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => navigation.popToTop()}>
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
    marginLeft: 50,
    color: "#545454"
  },
  buttonText: {
    fontSize: 18,
    color: "#fff"
  },
});

export default openMeeting5;