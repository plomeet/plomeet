import React, { Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import { WebView } from 'react-native-webview';

const PolicyDoc = () => {
    return (
        //<WebView source={{ uri: 'http://127.0.0.1:8000' }} />
        <WebView source={{ uri: 'http://k6a205.p.ssafy.io' }} />
    );
};

export default PolicyDoc;