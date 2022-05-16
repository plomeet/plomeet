/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './routes';
import { connect } from 'react-redux';

const App = () => {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
    return {
      userId: state.userId,
      kakaoId: state.kakaoId,
      nickname: state.nickname,
      img: state.img,
      name: state.name,
      email: state.email,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      setUserId: userId => dispatch(actions.setUserId(userId)),
      setkakaoId: kakaoId => dispatch(actions.setkakaoId(kakaoId)),
      setNickname: nickname => dispatch(actions.setNickname(nickname)),
      setImg: img => dispatch(actions.setImg(img)),
      setName: name => dispatch(actions.setName(name)),
      setEmail: email => dispatch(actions.setEmail(email)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(App);
