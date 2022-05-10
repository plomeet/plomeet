import React, { Component, Node } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TextInput, Button, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity  } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "../plogging/map";
import { ScrollView } from 'react-native-gesture-handler';


const meetingDetail = ({route}) => {
  let detail = route.params.detail;
  let meetingImg = route.params.img;
  let meetingName = route.params.title;
  let meetingPlace = route.params.place;
  let memberMax = route.params.maxMember;
  let memberCnt = route.params.numMember;
  let meetingDate = route.params.date;
  let placeDetail = route.params.placeDetail;
  let lat = route.params.lat;
  let lng = route.params.lng;

  const location = {latitude: lat, longitude: lng};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};

    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri : meetingImg}}
          />
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

          {/* <View style={[styles.row, {marginBottom:50}]}>
            <Text style={[{color: '#313333'},{fontWeight: 'bold'}, {marginRight:20}]}>상세주소</Text>
            <Text>{placeDetail}</Text>
          </View> */}

        </View>
        
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
    flex: 1,
    right: 0,
    bottom: 0,
    height: 155,
    backgroundColor: "#1BE58D",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 15,
    marginTop: 15,
    lineHeight : 22,
    marginBottom: 15,
    color: "#313333"
  },
  image: {
    height : 180,
    marginTop: 20,
    borderRadius: 10,
  },
  tempMap: {
    alignItems:'center',
    justifyContent:'center',
    height : 220,
    marginTop: 40,
    marginBottom:50
  }
});

export default meetingDetail;