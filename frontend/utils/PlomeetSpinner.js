import React, { Component, Node, Button, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, AppRegistry, TouchableOpacity, Dimensions } from "react-native";
import Spinner from 'react-native-spinkit'


const PlomeetSpinner = ({ isVisible, size }) => {
    return (
        <View style={styles.container}>
            <Spinner isVisible={isVisible} size={size} type={'ThreeBounce'} color={"#1BE58D"} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1001,
    },
});

export default PlomeetSpinner;