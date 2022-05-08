import React, { Component, Node } from 'react';
import 'react-native-gesture-handler';
import { Chip, ToggleButton } from 'react-native-paper';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity  } from "react-native";
import { useNavigation } from '@react-navigation/native';


const openMeeting3 = () => {
  const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>모임 인원</Text>
        <TextInput
          // value={this.state.myTextInput}
          style={styles.input}
          placeholder="모임의 최대인원을 입력해주세요."
          keyboardType='numeric'
          autoFocus
          maxLength={3}
          autoCapitalize='none'
          returnKeyType='next'
          // onChangeText={this.onChangeInput}
        />
        <Text style={[styles.title, {marginTop:40}]}>모임 날짜</Text>
        <View  style={[styles.row, {marginLeft:30}, {marginBottom:10}, {marginTop:20}]}>
          <Chip style={{marginRight:10}} icon="clock" mode="outlined" selectedColor='#232732'> 5월 10일 (화)</Chip>
        </View>
        <Text style={[styles.title, {marginTop:40}]}>준비물</Text>
        <View style={[styles.row, {marginLeft:30}, {marginBottom:10}, {marginTop:20}]}>
          <TouchableOpacity style={styles.chip}><Text style={{color:"#000"}}>쓰레기 봉투</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chipOver}><Text style={{color:"#fff"}}>집게</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chip}><Text style={{color:"#000"}}>물티슈</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chipOver}><Text style={{color:"#fff"}}>면장갑</Text></TouchableOpacity>
        </View>
        <View style={[styles.row, {marginLeft:30}, {marginBottom:10}]}>
          <TouchableOpacity style={styles.chip}><Text style={{color:"#000"}}>운동화</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chipOver}><Text style={{color:"#fff"}}>물</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chip}><Text style={{color:"#000"}}>도시락</Text></TouchableOpacity>
        </View>
        <View style={{flex:1}}/>
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => navigation.navigate('OpenMeeting4')}>
          <Text style={styles.text}>다음</Text>
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
  row:{
    flexDirection: 'row',
    alignItems: 'center',
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
  chipOver: {
    height: 35,
    paddingHorizontal: 15,
    backgroundColor: "#1BE58D",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 30
  },
  chip: {
    height: 35,
    paddingHorizontal: 15,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 30
  },
  text: {
    fontSize: 18,
    color: "#fff"
  },
  
});

export default openMeeting3;