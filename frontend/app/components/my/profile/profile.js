import React, { Component, Node, Button, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { useSelector } from 'react-redux';
import { ProfileContainer, ProfileImage } from "./styles";

const Profile = () => {
    const nickname = useSelector(state => state.nickname)
    const img = useSelector(state => state.img)
    const email = useSelector(state => state.email)

    const [index, setIndex] = useState(true);
    const [index2, setIndex2] = useState(true);
    const [value, onChangeText] = useState("");

    const updateNickname = () => {
        setIndex(false);
        setIndex2(false);
    }

    const confirmNickname = () => {
        setIndex(true);
        setIndex2(true);
    }

    var input = null;
    if (index2) {
        input = <Text style={styles.Text}>{nickname}</Text>
    } else {
        input = <TextInput style={styles.input}
            placeholder="닉네임"
            keyboardType="default"
            autoFocus
            maxLength={10}
            autoCapitalize="none"
            onChangeText={text => onChangeText(text)}
            value={value}></TextInput>
    }

    var button = null;
    if (index) {
        button = <TouchableOpacity style={styles.TouchableOpacityStyle} onPress={updateNickname}>
            <Text style={styles.Text3}>수정</Text>
        </TouchableOpacity>;
    } else {
        button = <TouchableOpacity style={styles.TouchableOpacityStyle} onPress={confirmNickname}>
            <Text style={styles.Text3}>완료</Text>
        </TouchableOpacity>;
    }

    return (
        <View style={styles.Container}>
            <TouchableOpacity style={styles.Touchable}>
                <Image style={styles.ProfileImage} source={{ uri: img }}></Image>
            </TouchableOpacity>
            <View style={styles.ContainerInput}>
                {input}
                {/* <Text style = {styles.Text}>{nickname}</Text> */}
                <Text style={styles.Text2}>{email}</Text>
            </View>
            {button}
            {/* <TouchableOpacity style= {styles.TouchableOpacityStyle} onPress={updateNickname}>
                <Text style = {styles.Text3}>수정</Text>
            </TouchableOpacity> */}
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
    Touchable: {
        flex: 1,
    },
    ContainerInput: {
        flex: 3,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-end',
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
        paddingTop: 5,
        paddingBottom: 16,
        paddingLeft: 4,
        flex: 0.3,
        fontSize: 20,
        color: '#000000'
    },
    input: {
        flex: 0.3,
        fontSize: 20,
    },
    Text2: {
        flex: 0.5,
        fontSize: 14,
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
        color: '#FFFFFF'
    }
})

export default Profile;