import React, { Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, BackHandler } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Home = () => {
    const nickname = useSelector(state => state.nickname)
    BackHandler.addEventListener('hardwareBackPress', () => {
        return true;
      });
    return (
        <View>
            <Text>{nickname}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default Home;
