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
import { useDispatch, useSelector } from 'react-redux';

import { connect } from 'react-redux';
import * as actions from '../../actions/userActions';

import { createUser } from '../../../utils/firestore';
import axiosInstance from '../../../utils/API';
import { setFirstRegister } from '../../actions/badgeAction'

const kakaoHelper = require('./KakaoHelper.js');


const NicknameRegister = () => {
  
  const [value, onChangeText] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nickname = useSelector(state => state.nickname)
  const isDelete = useSelector(state => state.isDelete)
  const userId = useSelector(state => state.userId)
  const kakaoId = useSelector(state => state.kakaoId)
  const name = useSelector(state => state.name)
  const img = useSelector(state => state.img)
  const email = useSelector(state => state.email)
  const [canRegi, canRegiChange] = useState(false);


  const NicknameUpdate = () => {
    dispatch(actions.setNickname(value));
    console.log("hey",nickname);
  }
  

  useEffect(() => { 
    KakaoLogins.getProfile().then(result => {
      dispatch(actions.setkakaoId(result.id))
      dispatch(actions.setImg(result.profileImageUrl))
      dispatch(actions.setName(result.nickname))
      dispatch(actions.setEmail(result.email))
    });
  },[])

  useEffect(() => { 
    if(/^[a-zA-Zㄱ-힣0-9]{2,10}$/.test(value))canRegiChange(true);
    else canRegiChange(false);
  },[value])

  const getParam = ()=>{
    let param = {};
    if(isDelete){
      param = {
        userId: userId,
        kakaoUserId: kakaoId,
        userNickName: value, // 입력받은값으로 변경
        userProfileImg: img,
        userName: name,
        userEmail: email,
        isDelete: true
      }
    }else{
      param = {
        kakaoUserId: kakaoId,
        userNickName: value, // 입력받은값으로 변경
        userProfileImg: img,
        userName: name,
        userEmail: email,
      }
    }
    return param;
  }

  const Register = () => {
    axios.post('http://127.0.0.1:8000/user', getParam(), {
      "Content-Type": "application/json",
    },).then(async(response) => {
      console.log(response);
      NicknameUpdate();
      dispatch(actions.setUserId(response.data.userId));
      const userIdRegister = response.data.userId.toString();
      const userProfileImg = (img==null)? "https://i.postimg.cc/G23gPzdy/profile-default.png":img;
      await createUser({userId: userIdRegister, userNickName: value, userProfileImg: userProfileImg});
      await getFirstRegisterBadge({userId: userIdRegister});
      navigation.navigate('M');
    }).then((error) => {
      console.log(error);
    }); 
  };

  const getFirstRegisterBadge = async({userId}) => {
    try{
      await axiosInstance.get(`/badges/${userId}/6`)
      .then((response) => {
        if(response.status === 200){
          if(!response.data.isOwned) {
            dispatch(setFirstRegister(true))
          } else{
            dispatch(setFirstRegister(false))
          }
        } else {
          console.log("error"+response.status);
        }
      })
    }catch(error) {
      console.log(error);
    }
  }

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
          {canRegi ? <Text style={styles.blue}>사용 가능한 닉네임입니다.</Text> : <Text style={styles.red}>영문, 한글, 숫자로 이루어진 2~10자리만 가능합니다.</Text>}
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={!canRegi}
          onPress={() => Register()}>
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
  blue: {
    color: "blue"
  },
  red: {
    color: "red"
  }
});

const mapStateToProps = state => {
  return {
    id: state.id,
    nickname: state.nickname,
    img: state.img,
    name: state.name,
    email: state.email,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setId: id => dispatch(actions.setId(id)),
    setNickname: nickname => dispatch(actions.setNickname(nickname)),
    setImg: img => dispatch(actions.setImg(img)),
    setName: name => dispatch(actions.setName(name)),
    setEmail: email => dispatch(actions.setEmail(email)),
  }
}

export default NicknameRegister;
