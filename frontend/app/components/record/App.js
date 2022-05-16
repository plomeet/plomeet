import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Record from '.';

const App = ({ saveLogs, setListMonth }) => {
    return (
        <Record saveLogs={saveLogs} setListMonth={setListMonth}></Record>
    )
}

export default App;