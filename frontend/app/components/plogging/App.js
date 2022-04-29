import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import Plogging from '.';
import PloggingStatusBar from './plogging-status-bar';

const App = ({ distSum, setDistSum }) => {
return (
        <View>
            <PloggingStatusBar distSum={distSum}></PloggingStatusBar>
            <Plogging setDistSum={setDistSum}></Plogging>
        </View>
    )
}

export default App;