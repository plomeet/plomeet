import React, { useEffect, useRef, useState, Component, Node } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert, KeyboardAvoidingView,TouchableOpacity, Keyboard, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "../plogging/map";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const openMeeting2 = () => {
  const navigation = useNavigation();
  const [address, setAdress] = useState(''); //상세주소 검색
  
  const [location, setLocation] = useState({ latitude: 37.564362, longitude: 126.977011 });
  const [center, setCenter] = useState();
  const [meetingPlace, setMeetingPlace] = useState("");

  const [titleValid, setTitleValid] = useState(false);
  const [addressValid, setAddressValid] = useState(false);
  const [nextDisable, setNextDisable] = useState(true);

  function goNext() {
    AsyncStorage.setItem('lat', String(location.latitude), () => {
      console.log('[모임 좌표 저장 완료] : '+location.latitude.toFixed(5));
    });
    AsyncStorage.setItem('lng', String(location.longitude), () => {
      console.log('[모임 좌표 저장 완료] : '+location.longitude.toFixed(5));
    });
    AsyncStorage.setItem('address', address, () => {
      console.log('[모임 주소 저장 완료] ' + address);
    });
    AsyncStorage.setItem('meetingPlace', meetingPlace, () => {
      console.log('[모임 장소 명칭 저장 완료] ' + meetingPlace);
    });
    navigation.push('OpenMeeting3');
  }

  const aliasChangeHandler = (text) => {
    setMeetingPlace(text)
    if (text.trim().length === 0) {
      setTitleValid(false);
      setNextDisable(true);
    } else {
      setTitleValid(true);
      if(addressValid){
        setNextDisable(false);
      }
    }
  };


  async function searchAddress(address) {
    const response = await axios.get(
      'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=' + address,
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID" : "ndh21004t3",
          "X-NCP-APIGW-API-KEY" : "9n2oMIaYszDviPmDNRZRPiCGcPIcbFqbiDsMarpY"
        },
      },
    ).then(res => {
      var longitude = Number(res.data.addresses[0].x)
      var latitude = Number(res.data.addresses[0].y)
      setLocation({...location, latitude, longitude });
      setCenter({...center, latitude, longitude});
      setAddressValid(true);
      if(titleValid && addressValid) setNextDisable(false);
    })
  };

  async function searchCoords(location) {
    console.log(location);
    const response = await axios.get(
      'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=' + location.longitude +','+location.latitude + '&orders=addr&output=json',
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID" : "ndh21004t3",
          "X-NCP-APIGW-API-KEY" : "9n2oMIaYszDviPmDNRZRPiCGcPIcbFqbiDsMarpY"
        },
      },
    ).then(res => {
      var map = JSON.parse(res.request.response);
      var add = map.results[0].region;
      console.log(add);
      var address = add.area1.name +" "+ add.area2.name + " " + add.area3.name + " " + add.area4.name;
      console.log(address);
      setAdress(String(address));
      if(titleValid) setNextDisable(false);
    })
  };
  
  const locationHandler = (e) => { 
    // setCurrentLocation(e.latitude, e.longitude); 
    Alert.alert( 
      "", 
      "이곳으로 모임 장소를 변경할까요?", 
      [ 
        { text: '아니오'}, 
        { text: '네', onPress: () => { 
          setLocation(e);
          console.warn('onMapClick', JSON.stringify(e)); 
          searchCoords(e)
          setAddressValid(true);
          if(titleValid && addressValid) setNextDisable(false);
        }} 
      ], 
      { cancelable: false } 
    ); 
  };


  //화면에 렌더링되면 권한부터 살피자
  useEffect(() => {
    if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse');
        getRealTimeLoc();
    }
    if (Platform.OS === 'android')
        if (requestLocationPermission())//권한 활용에 동의한 상태라면 처음 위치를 가져와서 지도 중심으로 잡는다. ios도 동일하게 해줘야한다
            getRealTimeLoc();           // 이거 안하면 사용자 입장에서 시작시 좌표 중심이 바로 바뀐다.
  }, []);

  //렌더링 시 실행해서 현재 위치 및 주요 state들 셋팅
  const getRealTimeLoc = () => {
    Geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
            const { latitude, longitude } = position.coords;
            setLocation({
                ...location,
                latitude,
                longitude,
            });
            setCenter({
                ...center,
                latitude,
                longitude,
            });
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // const location = {latitude: lat, longitude: lng};
  const temp_location = {latitude: 37.565051, longitude: 126.978567};

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container} scrollEnabled={false}>
        <Text style={styles.title}>장소명(명칭)</Text>
        <TextInput
          // value={this.state.myTextInput}
          style={styles.input}
          placeholder="모임 장소를 한줄로 설명해주세요."
          keyboardType='default'
          autoFocus
          maxLength={20}
          autoCapitalize='none'
          returnKeyType='next'
          onChangeText={(text) => aliasChangeHandler(text)}
          // onChangeText={this.onChangeInput}
        />
        <Text style={[styles.title, {marginTop:40}]}>상세주소(도로명)</Text>

        <View style={styles.row}>
          <TextInput
            style={styles.input2}
            placeholder="상세 주소를 입력해주세요."
            keyboardType='default'
            maxLength={500}
            multiline={true}
            value = {address}
            onChangeText={newAddress => setAdress(newAddress)}
            autoCapitalize='none'
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.searchButton} onPress={() => searchAddress(address)} >
            <Text style={styles.text}>검색</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageBackground}>
        <NaverMapView
                  style={{width: '100%', height: '100%'}} 
                  showsMyLocationButton={true}
                  onMapClick={e => locationHandler(e)}
                  center={{ ...location, zoom: 16 }}>
                  <Marker coordinate={location} pinColor="green"/>
              </NaverMapView>
        </View>
        <Text style={[{marginLeft:25}, {marginRight:30}, {marginTop:10}, {color:"#aaaaaa"}]}> - 지도를 클릭해 정확한 위치에 마커를 찍어주세요!</Text>
        <View style={{flex:1}}/>
        <TouchableOpacity activeOpacity={0.8} disabled={nextDisable} style={nextDisable? styles.disButton :styles.button} onPress={() => goNext()}>
          <Text style={styles.text}>다음</Text>
        </TouchableOpacity>
      </View>
        </TouchableWithoutFeedback>
    );
};

async function requestLocationPermission() { // 승인 안했을때나 에러 났을때의 처리는 나중에..
  try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
              title: '위치 권한',
              message: '플로깅 중 위치정보 활용에 동의합니다.',
              buttonNeutral: '나중에',
              buttonNegative: '거부',
              buttonPositive: '승인',
          },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          return true;
      } else {
          console.log('Location permission denied');
          return false;
      }
  } catch (err) {
      console.warn(err);
      return false;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  inner: {
    flex: 1,
    justifyContent: "space-around"
  },
  input: {
    marginHorizontal: 30,
    fontSize: 15,
    borderBottomWidth: 1,
  },
  input2: {
    marginHorizontal: 30,
    fontSize: 15,
    borderBottomWidth: 1,
    flex: 3
  },
  title: {
    marginTop: 30,
    color: '#313333',
    marginLeft: 30,
    fontWeight: 'bold',
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
  disButton: {
    height: 55,
    backgroundColor: "#aaaaaa",
    justifyContent: "center",
    alignItems: "center"
  },
  searchButton: {
    height: 40,
    backgroundColor: "#1BE58D",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: -10,
    marginBottom: -8,
    marginRight:30
  },
  text: {
    fontSize: 18,
    color: "#fff"
  },
  imageBackground: {
    alignItems:'center',
    justifyContent:'center',
    height : 250,
    marginTop: 30,
    marginHorizontal: 30,
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default openMeeting2;