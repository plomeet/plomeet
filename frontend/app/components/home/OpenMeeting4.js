import React, { Component, Node, useState, useCallback } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Pressable, KeyboardAvoidingView, Modal, ImageBackground, TouchableWithoutFeedback, Keyboard, Image, Platform, TouchableOpacity  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import { launchImageLibrary } from 'react-native-image-picker';
import styled from "styled-components/native";
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

const OpenMeeting4 = () => {

  const [imageSource, setImageSource] = useState({uri:'', fileName:''});

  function goNext() {
    AsyncStorage.setItem('meetingImgUri', imageSource.uri, () => {
      console.log('[모임 이미지 Uri 저장 완료] '+imageSource.uri);
    });
    AsyncStorage.setItem('meetingImgFileName', imageSource.fileName, () => {
      console.log('[모임 이미지 fileName 저장 완료] '+imageSource.fileName);
    });
    navigation.push('OpenMeeting5');
  }

  const options = {
    title: 'Load Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
  };

  const showCameraRoll = () => {
    launchImageLibrary(options, (response) => {
        if (response.error) {
            console.log('LaunchImageLibrary Error: ', response.error);
        }
        else {
            if (!response.didCancel) {
                console.log(response.assets[0])
                const newImg = {
                    uri: response.assets[0].uri,
                    fileName: response.assets[0].fileName,
                }
                setImageSource(newImg);
            }
        }
    });
  };
  

  const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>소개 이미지 선택</Text>
        <TouchableOpacity style={styles.imagePlusButton} activeOpacity={0.8} onPress={() => {showCameraRoll()}}>
          <Photo source={{ uri: imageSource.uri }}/>
          <Icon style={{position:'absolute'}} name='plus' size={50} color='#C4C4C4' />
        </TouchableOpacity>
        <View style={{flex:1}}/>
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => goNext()}>
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
  })

  const Photo = styled.Image`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 10px;
`;

export default OpenMeeting4;