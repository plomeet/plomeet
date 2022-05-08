import React, { Component, Node } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity  } from "react-native";
import { useNavigation } from '@react-navigation/native';

const openMeeting5 = () => {
  const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <Text>입력한 정보 마지막으로 확인하는 부분</Text>
        <View style={{flex:1}}/>
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={console.log("모임 생성하기")}>
          <Text style={styles.text}>모임 생성하기</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
});

export default openMeeting5;