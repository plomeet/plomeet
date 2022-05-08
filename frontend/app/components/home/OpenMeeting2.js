import React, { Component, Node } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TextInput, Button, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity  } from "react-native";
import { useNavigation } from '@react-navigation/native';


const openMeeting2 = () => {
  const navigation = useNavigation();

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

        <View style={styles.imageBackground}><Text>지도</Text></View>
        

        <View style={{flex:1}}/>
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => navigation.navigate('OpenMeeting3')}>
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
  text: {
    fontSize: 18,
    color: "#fff"
  },
  imageBackground: {
    borderWidth: 1,
    alignItems:'center',
    justifyContent:'center',
    height : 250,
    marginTop: 30,
    marginHorizontal: 30,
  }
});

export default openMeeting2;