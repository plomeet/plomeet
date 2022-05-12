import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as KakaoLogins from '@react-native-seoul/kakao-login';
import axiosInstanceLocal from "../../../utils/API";
import LogoImage from '../../../assets/imgs/6881.png';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const kakaoHelper = require('./KakaoHelper.js');


const NicknameRegister = () => {
  
  const [value, onChangeText] = useState("");
  const navigation = useNavigation();

  var id = '';
  var nickname = value;
  var img = '';
  var name = '';
  var email = '';
  console.log(value);
  
  
  // kakaoHelper.getProfile();
    KakaoLogins.getProfile().then(result => {
      id = result.id;
      img = result.profileImageUrl;
      name = result.nickname;
      email = result.email;
    });

  // setTimeout(() => {console.log(img)},100);
  // setTimeout() 걸어줄것
  
  // setTimeout(() => {},100);
  const Register = async () => {
    axios.post('http://k6a205.p.ssafy.io:8000/user', {
      kakaoUserId: id,
      userNickName: nickname, // 입력받은값으로 변경
      userProfileImg: img,
      userName: name,
      userEmail: email,
    }, {
      "Content-Type": "application/json",
    },).then((response) => {
      console.log(response);
    }).then((error) => {
      console.log(error);
    }); 
    navigation.navigate('M');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled={true}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#D5FF7C', '#74E9AD', '#12D3DD']}
        style={styles.container}>
        <View>
          <Text style={styles.title}>닉네임</Text>
          <TextInput
            style={styles.input}
            placeholder="닉네임을 입력해주세요."
            keyboardType="default"
            autoFocus
            maxLength={10}
            autoCapitalize="none"
            onChangeText={text => onChangeText(text)}
            value={value}>
          </TextInput>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>  Register()}>
          <View style={styles.button2}>
            <Text style={styles.title2}>회원가입</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.logo}>
          <Image
            source={LogoImage}
            resizeMode={'contain'}
            style={{
              width: '42%',
              height: '42%',
            }}
          />
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 800,
    padding: 20,
  },
  title: {
    marginTop: 140,
    marginBottom: 5,
    color: '#303644',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    color: '#303644',
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  button: {
    ...Platform.select({
      ios: {
        marginTop: 10,
      },
      android: {
        marginTop: 10,
        marginBottom: 10,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#5599FF',
    borderRadius: 5,
  },
  button2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#381E1F',
  },
  logo: {
    alignItems: 'center',
    marginTop: 250,
  },
});

export default NicknameRegister;
