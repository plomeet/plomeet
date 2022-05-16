import React, { Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, BackHandler } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import * as KakaoLogins from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const nickname = useSelector(state => state.nickname)
    const userId = useSelector(state => state.userId)

    function logout() {
        AsyncStorage.clear();
        KakaoLogins.logout()
          .then(result => {
            console.log(`### Logout Result : ${JSON.stringify(result)}`);
          })
          .catch(err => {
            console.log(`### Logout Error : ${JSON.stringify(err)}`);
          });
          console.log('여기서걸리나?')
        KakaoLogins.unlink();
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
        return true;
      });
    return (
        <View>
            <Text>{nickname}</Text>
            <Text>{userId}</Text>
            <Text onPress={logout}>로그아웃</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default Home;
