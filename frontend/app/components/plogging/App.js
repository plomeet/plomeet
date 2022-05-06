import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Plogging from '.';
import PloggingStatusBar from './plogging-status-bar';
import PloggingStartEndButton from './button/index';

const App = ({ distSum, setDistSum, isPlogging, handleIsPlogging, showPloggingEndPage, handleShowEndPage, timeSum, setTimeSum }) => {
    return (
        <View>
            {!showPloggingEndPage && <PloggingStatusBar distSum={distSum} isPlogging={isPlogging} setTimeSum={setTimeSum} timeSumString={timeSum}></PloggingStatusBar>}
            <Plogging setDistSum={setDistSum} isPlogging={isPlogging} showPloggingEndPage={showPloggingEndPage}></Plogging>
            <PloggingStartEndButton isPlogging={isPlogging} handleIsPlogging={handleIsPlogging}
                showPloggingEndPage={showPloggingEndPage} handleShowEndPage={handleShowEndPage}></PloggingStartEndButton>
        </View>
    )
}

export default App;