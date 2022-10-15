import React, { Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axiosInstance from "../../../../../utils/API";
import * as KakaoLogins from '@react-native-seoul/kakao-login';

const PreferenceAuth = () => {
    const navigation = useNavigation();
    const userId = useSelector(state => state.userId);

    const userDelete = () => {
        KakaoLogins.logout().then(result => {
            console.log("로그아웃 성공");
            KakaoLogins.unlink()
            .then(result => {
                console.log("연결해제 성공");
                axiosInstance.put("/user/delete",{userId:userId})
                    .then((response) => {
                        if (response.status === 200) {
                            console.log("delete success");
                            
                        } else {
                            console.log("delete fail");
                        }
                    })
                    .catch((response) => { console.log("delete error because : " + response); });
            }).catch(err => console.log(`### unLink Error : ${JSON.stringify(err)}`))
        }).catch(err => {
                console.log(`### logOut Error : ${JSON.stringify(err)}`);
        }); 
        AsyncStorage.removeItem('refreshToken');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => userDelete()}>
                <View style={styles.listContainer}>
                    <Text style={styles.menuText}>계정탈퇴</Text>
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
        borderBottomWidth: 1,
        borderColor: "#BEBEBE",
        justifyContent: "center",
        alignItems: "center",
    },
    menuText: {
        color: "#D9534F",
        flex: 9,
        alignItems: 'flex-start',
        justifyContent: "center",
        fontSize: 18,
        marginLeft: 10,
    },
});

export default PreferenceAuth;