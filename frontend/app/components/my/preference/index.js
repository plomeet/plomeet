import React, { Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import DetailArrow from '../../record/icon/detailArrow.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import VersionCheck from "react-native-version-check";
import * as KakaoLogins from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-community/async-storage';

const Preference = () => {
    const navigation = useNavigation();

    function logout() {
        KakaoLogins.logout()
          .then(result => {
            console.log(`### Logout Result : ${JSON.stringify(result)}`);
          })
          .catch(err => {
            console.log(`### Logout Error : ${JSON.stringify(err)}`);
          });
          AsyncStorage.clear();
          navigation.replace('SignUp');
      }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('PolicyDoc', { msg: "go PolicyDoc screen" })}>
                <View style={styles.listContainer}>
                    <Text style={styles.menuText}>이용약관 및 운영정책</Text>
                    <View style={styles.detailButtonContainer}>
                        <DetailArrow></DetailArrow>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.listContainer}>
                <Text style={styles.menuText}>버전</Text>
                <Text style={styles.versionText}>{VersionCheck.getCurrentVersion()}</Text>
            </View>
            <View style={styles.listContainer}>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('PreferenceAuth', { msg: "go PreferenceAuth screen" })}>
                <View style={styles.listContainer}>
                    <Text style={styles.menuText}>계정</Text>
                    <View style={styles.detailButtonContainer}>
                        <DetailArrow></DetailArrow>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
                <View style={styles.listContainerFinal}>
                    <Text style={styles.menuText2}>로그아웃</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#FFF",
        height: "100%",
    },
    listContainer: {
        flexDirection: "row",
        height: 60,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderColor: "#BEBEBE",
        justifyContent: "center",
        alignItems: "center",
    },
    listContainerFinal: {
        flexDirection: "row",
        height: 60,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#BEBEBE",
        justifyContent: "center",
        alignItems: "center",
    },
    menuText: {
        color: "#000000",
        flex: 9,
        alignItems: 'flex-start',
        justifyContent: "center",
        fontSize: 18,
        marginLeft: 10,
    },
    menuText2: {
        color: "#6D6D6D",
        flex: 9.5,
        alignItems: 'flex-start',
        justifyContent: "center",
        fontSize: 18,
        marginLeft: 10,
    },
    detailButtonContainer: {
        flex: 0.5,
        justifyContent: "flex-end",
    },
    versionText: {
        flex: 1.5,
        fontSize: 15,
        justifyContent: "flex-end",
    }
});

export default Preference;