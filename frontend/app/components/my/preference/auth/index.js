import React, { Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const PreferenceAuth = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => console.log('계정탈퇴')}>
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