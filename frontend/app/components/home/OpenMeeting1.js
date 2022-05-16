import React, { Component, Node, useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity, NativeModules } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const { StatusBarManager } = NativeModules

const openMeeting1 = () => {
  const navigation = useNavigation();
  const [titleValid, setTitleValid] = useState(false);
  const [meetingName, setMeetingName] = useState("");
  const [contentValid, setContentValid] = useState(false);
  const [meetingDetail, setMeetingDetail] = useState(false);
  const [nextDisable, setNextDisable] = useState(true);
  const [statusBarHeight, setStatusBarHeight] = useState(-400);


  function goNext() {
    AsyncStorage.setItem('meetingName', meetingName, () => {
      console.log('[모임 제목 저장 완료] '+meetingName);
    });
    AsyncStorage.setItem('meetingDetail', meetingDetail, () => {
      console.log('[모임 내용 저장 완료] '+ meetingDetail);
    });
    navigation.push('OpenMeeting2');
  }

  const titleChangeHandler = (text) => {
    setMeetingName(text)
    if (text.trim().length === 0) {
      setTitleValid(false);
      setNextDisable(true);
    } else {
      setTitleValid(true);
      if(titleValid && contentValid) setNextDisable(false);
    }
  };
  const contentChangeHandler = (text) => {
    setMeetingDetail(text)
    if (text.trim().length === 0) {
      setContentValid(false);
      setNextDisable(true);
    } else {
      setContentValid(true);
      if(titleValid && contentValid) setNextDisable(false);
    }
  };

  
  useEffect(() => {
    Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
      setStatusBarHeight(statusBarFrameData.height)
    }) : null;
  }, []);

    return (
      <KeyboardAvoidingView style={styles.container} behavior={"padding"} keyboardVerticalOffset={statusBarHeight+44}>
        <Text style={styles.title}>모임 제목</Text>
        <TextInput
          // value={this.state.myTextInput}
          style={styles.input}
          placeholder="모임의 제목을 입력해주세요."
          keyboardType='default'
          autoFocus
          maxLength={20}
          autoCapitalize='none'
          returnKeyType='next'
          onChangeText={(text) => titleChangeHandler(text)}
        />
        <Text style={[styles.title, {marginTop:40}]}>모임 설명</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="모임의 상세 설명을 입력해주세요."
          keyboardType='default'
          maxLength={500}
          multiline={true}
          onChangeText={(text) => contentChangeHandler(text)}
          autoCapitalize='none'
        />
        <View style={{flex:1}}/>
        <TouchableOpacity activeOpacity={0.8} disabled={nextDisable} style={nextDisable? styles.disButton :styles.button} onPress={() => goNext()}>
          <Text style={styles.text}>다음</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
};

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
  disButton: {
    height: 55,
    backgroundColor: "#aaaaaa",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 18,
    color: "#fff"
  }
});

export default openMeeting1;