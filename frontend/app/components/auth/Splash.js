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
import * as actions from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const AuthComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nickname = useSelector(state => state.nickname)
  const userId = useSelector(state => state.userId)
  const kakaoId = useSelector(state => state.kakaoId)
  const name = useSelector(state => state.name)
  const img = useSelector(state => state.img)
  const email = useSelector(state => state.email)
  
  useEffect(()=>{
    AsyncStorage.getItem('refreshToken').then( async res => {
      console.log(res);
        if(res) {
          await KakaoLogins.getProfile().then(result => {
            kakaoUserId = result.id;
          });
         
          await axios.get('http://plomeet-app.com:8000/user/' + kakaoUserId)
          .then(async (response) => {
            // console.log(response.data.userId);
            dispatch(actions.setNickname(response.data.userNickName));
            dispatch(actions.setUserId(response.data.userId));
            if(response.status == 200){
              //store 저장
              await KakaoLogins.getProfile().then(result => {
                // console.log(result)
                dispatch(actions.setkakaoId(result.id))
                dispatch(actions.setImg(result.profileImageUrl))
                dispatch(actions.setName(result.nickname))
                dispatch(actions.setEmail(result.email))
                navigation.replace('M');
              });
            }
          })
          //})},2000);
        }else{
          console.log('조기')
          //setTimeout(() => {navigation.navigate('SignUp');},1000);
          navigation.navigate('SignUp');
        }
      });
  }, []);

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
