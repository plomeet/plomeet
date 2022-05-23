import React, {useState, Component, useEffect} from 'react';
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
import AsyncStorage from '@react-native-community/async-storage';
import * as KakaoLogins from '@react-native-seoul/kakao-login';

import LogoImage from '../../../assets/imgs/6881.png';
import KakaoLogo from '../../../assets/imgs/kakao1.png';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions/userActions';

// const kakaoHelper = require('./KakaoHelper.js');

const SignUp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nickname = useSelector(state => state.nickname)
  const userId = useSelector(state => state.userId)
  const kakaoId = useSelector(state => state.kakaoId)
  const name = useSelector(state => state.name)
  const img = useSelector(state => state.img)
  const email = useSelector(state => state.email)

  var kakaoUserId = '';

  const isSignedUp = () => {
    AsyncStorage.getItem('refreshToken').then(res => {
      if(res) { //토큰이있으면
        KakaoLogins.login()
          .then(result => {
            console.log('갱신함')
            AsyncStorage.setItem('refreshToken', result.refreshToken);
            KakaoLogins.getProfile()
            .then(result => {
              console.log('프로필받음?')
              kakaoUserId = result.id;
              console.log(`### Profile Result : ${JSON.stringify(result)}`);
              axios.get('http://k6a205.p.ssafy.io:8000/user/' + kakaoUserId)
              .then((response) => {
                console.log(response.status);
                dispatch(actions.setNickname(response.data.userNickName));
                dispatch(actions.setUserId(response.data.userId));
                if(response.status == 200){ //홈으로, Redux 저장
                  dispatch(actions.setkakaoId(result.id))
                  dispatch(actions.setImg(result.profileImageUrl))
                  dispatch(actions.setName(result.nickname))
                  dispatch(actions.setEmail(result.email))
                  navigation.replace('M');
                }else{ // 진행시켜
                  console.log('토큰은있지만 가입한적없어?? ->말이안됨')
                  navigation.navigate('NicknameRegister');
                }
              }).catch((error) => {
                console.log(error); 
              }); 
            })
            
          })
      }else{ //토큰없으면
        console.log('토큰없음')
        KakaoLogins.login()
          .then(result => {
            AsyncStorage.setItem('refreshToken', result.refreshToken);
            KakaoLogins.getProfile()
              .then(result => {
                console.log(`### Profile Result : ${JSON.stringify(result)}`);
                  kakaoUserId = result.id;
                  axios.get('http://k6a205.p.ssafy.io:8000/user/' + kakaoUserId)
                  .then((response) => {
                    console.log(response.status);
                    dispatch(actions.setNickname(response.data.userNickName));
                    dispatch(actions.setUserId(response.data.userId));
                    if(response.status == 200){ //홈으로, Redux 저장
                      dispatch(actions.setkakaoId(result.id))
                      dispatch(actions.setImg(result.profileImageUrl))
                      dispatch(actions.setName(result.nickname))
                      dispatch(actions.setEmail(result.email))
                      navigation.replace('M');
                    }else{ // 진행시켜
                      console.log('토큰은있지만 가입한적없어?? ->말이안됨')
                      navigation.navigate('NicknameRegister');
                    }
                  }).catch((error) => {
                    console.log(error); 
                  });
                //navigation.navigate('NicknameRegister');
              })
              .catch(err => {
                console.log(`### Profile Error : ${JSON.stringify(err)}`);
              }); 
          })
      }
    })
  }
  // const isSignedUp = async (params) => {
  //   axios.get('http://k6a205.p.ssafy.io:8000/user/' + kakaoUserId)
  //    .then((response) => {
  //      console.log(response.status);
  //      if(response.status == 200){ //홈으로, Redux 저장
  //       navigation.navigate('M');
  //      }else{ // 진행시켜
  //       login();
  //       navigation.navigate('NicknameRegister');
  //      }
  //   }).catch((error) => {
  //     console.log(error); 
  //   });
  // };

  // function login() {
  //   KakaoLogins.login()
  //     .then(result => {
  //       console.log(`### Login Result : ${JSON.stringify(result)}`);
  //       AsyncStorage.setItem('refreshToken', result.refreshToken);
  //       KakaoLogins.getProfile()
  //         .then(result => {
  //           console.log(`### Profile Result : ${JSON.stringify(result)}`);
  //           navigation.navigate('NicknameRegister');
  //         })
  //         .catch(err => {
  //           console.log(`### Profile Error : ${JSON.stringify(err)}`);
  //         });
  //     })
  //     .catch(err => {
  //       console.log(`### Login Error : ${JSON.stringify(err)}`);
  //     });
  // }

  // function logout() {
  //   AsyncStorage.clear();
  //   KakaoLogins.logout()
  //     .then(result => {
  //       console.log(`### Logout Result : ${JSON.stringify(result)}`);
  //     })
  //     .catch(err => {
  //       console.log(`### Logout Error : ${JSON.stringify(err)}`);
  //     });
  //     console.log('여기서걸리나?')
  //   KakaoLogins.unlink();
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
