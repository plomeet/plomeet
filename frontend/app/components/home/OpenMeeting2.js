import React, { useEffect, useRef, useState, Component, Node } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "../plogging/map";


const openMeeting2 = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState({ latitude: 37.564362, longitude: 126.977011 });
  // const [adress, setAdress] = useState();
  const [center, setCenter] = useState();

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
      <View style={styles.container}>
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
          // onChangeText={this.onChangeInput}
        />
        <Text style={[styles.title, {marginTop:40}]}>상세주소(도로명)</Text>
        <TextInput
          style={styles.input}
          placeholder="모임 장소의 상세 주소를 입력해주세요."
          keyboardType='default'
          maxLength={500}
          multiline={true}
          autoCapitalize='none'
        />

        <View style={styles.imageBackground}>
        <NaverMapView
                  style={{width: '100%', height: '100%'}} 
                  showsMyLocationButton={true}
                  onMapClick={e => locationHandler(e)}
                  center={{ ...location, zoom: 16 }}>
                  <Marker coordinate={location} pinColor="green"/>
              </NaverMapView>
        </View>
        

        <View style={{flex:1}}/>
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => navigation.navigate('OpenMeeting3')}>
          <Text style={styles.text}>다음</Text>
        </TouchableOpacity>
      </View>
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
    borderBottomWidth: 1
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
  }
});

export default openMeeting2;