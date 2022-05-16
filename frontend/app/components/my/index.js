import React, { Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import BadgeIntro from './badge/badge_intro';
import Profile from './profile/profile';

const MyPage = () => {
    return (
        <View>
            <Text>내정보 화면</Text>
            <Profile></Profile>
            <BadgeIntro></BadgeIntro>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default MyPage;