import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AuthLogo from './authLogo';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import * as KakaoLogins from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const AuthComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nickname = useSelector(state => state.nickname)
  const id = useSelector(state => state.id)
  const name = useSelector(state => state.name)
  const img = useSelector(state => state.img)
  const email = useSelector(state => state.email)

  AsyncStorage.getItem('refreshToken').then(res => {
        if(res) {
          KakaoLogins.getProfile().then(result => {
            kakaoUserId = result.id;
          });
          setTimeout(() => {axios.get('http://k6a205.p.ssafy.io:8000/user/' + kakaoUserId)
          .then((response) => {
            console.log(response.data.userNickName);
            dispatch(actions.setNickname(response.data.userNickName));
            if(response.status == 200){
              //store 저장
              KakaoLogins.getProfile().then(result => {
                dispatch(actions.setId(result.id))
                dispatch(actions.setImg(result.profileImageUrl))
                dispatch(actions.setName(result.nickname))
                dispatch(actions.setEmail(result.email))
              });
              navigation.navigate('M');
            }else{
              navigation.navigate('SignUp');
            }
          })},2000);
        }else{
          setTimeout(() => {navigation.navigate('SignUp');},1000);
        }
      });


  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#D5FF7C', '#74E9AD', '#12D3DD']}
      style={styles.container}>
      <View>
        <AuthLogo />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 100,
  },
});

export default AuthComponent;
