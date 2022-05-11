import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Plogging from '.';
import PloggingStatusBar from './plogging-status-bar';
import PloggingStartEndButton from './button/index';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = ({ distSum, setDistSum, isPlogging, handleIsPlogging, showPloggingEndPage, handleShowEndPage, timeSum, setTimeSum, setStart, setWeatherLoc, setImages, setIsSave, setPloggingPath, resetPloggingPath }) => {
    return (
        <SafeAreaView>
            {(!showPloggingEndPage) && <PloggingStatusBar distSum={distSum} isPlogging={isPlogging} setTimeSum={setTimeSum} timeSumString={timeSum} setIsSave={setIsSave} resetPloggingPath={resetPloggingPath} setDistSum={setDistSum}></PloggingStatusBar>}
            <Plogging setDistSum={setDistSum} isPlogging={isPlogging} showPloggingEndPage={showPloggingEndPage} setWeatherLoc={setWeatherLoc} setImages={setImages} setPloggingPath={setPloggingPath}></Plogging>
            <PloggingStartEndButton isPlogging={isPlogging} handleIsPlogging={handleIsPlogging} showPloggingEndPage={showPloggingEndPage} handleShowEndPage={handleShowEndPage} setStart={setStart} setIsSave={setIsSave}></PloggingStartEndButton>
        </SafeAreaView>
    )
}

export default App;