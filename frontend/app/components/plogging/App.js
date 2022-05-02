import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import Plogging from '.';
import PloggingStatusBar from './plogging-status-bar';
import PloggingStartEndButton from './button/index';

const App = ({ distSum, setDistSum, isPlogging, handleIsPlogging }) => {
return (
        <View>
            <PloggingStatusBar distSum={distSum} isPlogging={isPlogging}></PloggingStatusBar>
            <Plogging setDistSum={setDistSum} isPlogging={isPlogging}></Plogging>
            <PloggingStartEndButton isPlogging={isPlogging} handleIsPlogging={handleIsPlogging}></PloggingStartEndButton>
        </View>
    )
}

export default App;