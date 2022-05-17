import React, { Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import BadgeIntro from './badge/badge_intro';
import Profile from './profile/profile';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BackSvg from '../plogging/icons/back.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyPage = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerTitle}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <BackSvg width={20} height={20} fill={"#FFF"} style={styles.backBtn}></BackSvg>
                </TouchableOpacity>
                <Text style={styles.titleText}>My</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Preference', { msg: "go Preference screen" })}>
                    <View style={styles.preferencBtn}>
                        <Icon name="settings-outline" size={27} color="#000000" />
                    </View>
                </TouchableOpacity>
            </View>
            <Profile></Profile>
            <BadgeIntro></BadgeIntro>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    containerTitle: {
        backgroundColor: "white",
        alignItems: 'center',
        borderBottomWidth: 0.3,
        flexDirection: "row",
        height: '8%',
    },
    backBtn: {
        flex: 0.1,
        marginLeft: 5
    },
    titleText: {
        flex: 0.9,
        fontSize: 20,
        marginLeft: 20,
        fontWeight: "bold",
    },
    preferencBtn: {
        width: 100,
        alignItems: "flex-end",
    }

});

export default MyPage;