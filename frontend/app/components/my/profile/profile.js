import React, { Component, Node, Button } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useSelector } from 'react-redux';
import { ProfileContainer, ProfileImage } from "./styles";

const Profile = () => {
    const nickname = useSelector(state => state.nickname)
    const img = useSelector(state => state.img)
    const email = useSelector(state => state.email)
    return(
        <View style = {styles.Container}>
            <TouchableOpacity >
                <Image style = {styles.ProfileImage} source={{uri: img}}></Image>
            </TouchableOpacity>
            <View>
                <Text style = {styles.Text}>{nickname}</Text>
                <Text style = {styles.Text2}>{email}</Text>
            </View>
            <TouchableOpacity style= {styles.TouchableOpacityStyle}>
                <Text style = {styles.Text3}>수정</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    Container: {
        height: 100,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0.3,
    },
    ProfileImage: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        left: 20,
        top: 20,
        marginBottom: 10,
        borderRadius: 50,
    },
    Text: {
        width: 170,
        height: 30,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        left: 40,
        top: 22,
        color:'#000000'
        // backgroundColor: '#808080'
    },
    Text2: {
        width: 170,
        height: 25,
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        left: 40,
        top: 22,
        // backgroundColor: '#808080'
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 65,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        bottom: 30,
        borderRadius: 25,
        backgroundColor: '#1BE58D'
    },
    Text3: {
        fontSize: 16,
    }
})

export default Profile;