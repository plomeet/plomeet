import React, { Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import BadgeIntro from './badge/badge_intro';

const MyPage = () => {
    return (
        <View>
            <Text>내정보 화면</Text>
            <BadgeIntro></BadgeIntro>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default MyPage;