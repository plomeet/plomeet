import React, { Component, Node, useState, useCallback } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Pressable, KeyboardAvoidingView, Modal, ImageBackground, TouchableWithoutFeedback, Keyboard, Image, Platform, TouchableOpacity  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'react-native-image-picker';

export function ImagePickerAvatar({ uri}) {
  return (
    <TouchableOpacity style={styles.imagePlusButton} activeOpacity={0.8} onPress={() => console.log('이미지 등록!')}>
      <Icon name='plus' size={50} color='#C4C4C4' />
    </TouchableOpacity>
    // <ImageBackground
    //   style={styles.imageBackground}
    //   source={{uri : 'https://i.postimg.cc/HLpSbynz/test6.jpg'}}
    //   imageStyle={{borderRadius: 15}}>
    //   <View style={styles.avatar}>
    //     <Image
    //       style={styles.avatarImage}
    //       onPress={console.log("이미지 등록")}
    //       source={{ uri :'https://i.postimg.cc/HLpSbynz/test6.jpg'}}
    //     />
    //   </View>
    // </ImageBackground>
  );
}

const openMeeting4 = () => {
  const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <Text style={styles.title}>소개 이미지 선택</Text>
        <ImagePickerAvatar></ImagePickerAvatar>
        <View style={{flex:1}}/>
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => navigation.navigate('OpenMeeting5')}>
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
  imagePlusButton: {
    borderWidth: 2,
    borderColor:"#C4C4C4",
    alignItems:'center',
    justifyContent:'center',
    marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 30,
    height: 180,
  },
  text: {
    fontSize: 18,
    color: "#fff"
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  },
  imageBackground: {
    height : 180,
    marginTop: 20,
    marginHorizontal: 30,
  }
});

export default openMeeting4;