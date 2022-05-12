import React, { Component, Node, useState} from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity  } from "react-native";
import { useNavigation } from '@react-navigation/native';


const openMeeting1 = () => {
  const navigation = useNavigation();
  const [titleValid, setTitleValid] = useState(false);
  const [contentValid, setContentValid] = useState(false);
  const [nextDisable, setNextDisable] = useState(true);
  const titleChangeHandler = (text) => {
    if (text.trim().length === 0) {
      setTitleValid(false);
      setNextDisable(true);
    } else {
      setTitleValid(true);
      if(titleValid && contentValid) setNextDisable(false);
    }
  };
  const contentChangeHandler = (text) => {
    if (text.trim().length === 0) {
      setContentValid(false);
      setNextDisable(true);
    } else {
      setContentValid(true);
      if(titleValid && contentValid) setNextDisable(false);
    }
  };

    return (
      <View style={styles.container}>
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
        <TouchableOpacity activeOpacity={0.8} disabled={nextDisable} style={nextDisable? styles.disButton :styles.button} onPress={() => navigation.push('OpenMeeting2')}>
          <Text style={styles.text}>다음</Text>
        </TouchableOpacity>
      </View>
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