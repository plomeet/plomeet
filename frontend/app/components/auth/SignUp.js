import React, {useState, Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as KakaoLogins from '@react-native-seoul/kakao-login';

import LogoImage from '../../../assets/imgs/6881.png';
import KakaoLogo from '../../../assets/imgs/kakao1.png';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

// const kakaoHelper = require('./KakaoHelper.js');

const SignUp = () => {
  const navigation = useNavigation();

  var kakaoUserId = '';

  KakaoLogins.getProfile().then(result => {
    kakaoUserId = result.id;
  });

  const isSignedUp = async (params) => {
    axios.get('http://k6a205.p.ssafy.io:8000/user/' + kakaoUserId)
     .then((response) => {
       console.log(response.status);
       if(response.status == 200){ //홈으로, Redux 저장
        navigation.navigate('M');
       }else{ // 진행시켜
        login();
        navigation.navigate('NickNameRegister');
       }
    }).catch((error) => {
      console.log(error); 
    });
  };

  function login() {
    KakaoLogins.login()
      .then(result => {
        console.log(`### Login Result : ${JSON.stringify(result)}`);
        AsyncStorage.setItem('refreshToken', result.refreshToken);
        KakaoLogins.getProfile()
          .then(result => {
            console.log(`### Profile Result : ${JSON.stringify(result)}`);
          })
          .catch(err => {
            console.log(`### Profile Error : ${JSON.stringify(err)}`);
          });
      })
      .catch(err => {
        console.log(`### Login Error : ${JSON.stringify(err)}`);
      });
      navigation.navigate('NicknameRegister');
  }

  // function logout() {
  //   KakaoLogins.logout()
  //     .then(result => {
  //       console.log(`### Logout Result : ${JSON.stringify(result)}`);
  //     })
  //     .catch(err => {
  //       console.log(`### Logout Error : ${JSON.stringify(err)}`);
  //     });
  // }

  BackHandler.addEventListener('hardwareBackPress', () => {
    return true;
  });

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#D5FF7C', '#74E9AD', '#12D3DD']}
      // colors={['#3AE468', '#3BDF86', '#3BDBA4']}
      style={styles.container}>
      <View>
        <Text style={styles.title}>반가워요!</Text>
        <Text style={styles.title2}>
          함께 즐거운 플로깅을 {'\n'}시작해 볼까요?
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={isSignedUp}>
        <View style={styles.button2}>
          <Image
            source={KakaoLogo}
            resizeMode={'contain'}
            style={{width: 35, height: 35}}></Image>
          <Text style={styles.title3}>카카오톡으로 시작하기</Text>
        </View>
      </TouchableOpacity>
      {/* <Text onPress={logout}>로그아웃</Text> */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginTop: 130,
    marginBottom: 20,
    color: '#303644',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title2: {
    color: '#303644',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    ...Platform.select({
      ios: {
        marginTop: 180,
      },
      android: {
        marginTop: 180,
        marginBottom: 10,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#FFE617',
    borderRadius: 5,
  },
  button2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  title3: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#381E1F',
  },
  logo: {
    alignItems: 'center',
    marginTop: 40,
  },
});

export default SignUp;
