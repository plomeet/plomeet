import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Plogging from '.';
import PloggingStatusBar from './plogging-status-bar';
import PloggingStartEndButton from './button/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BackSvg from '../plogging/icons/back.svg'

const App = ({ saveLogs, distSum, setDistSum, isPlogging, handleIsPlogging, showPloggingEndPage, handleShowEndPage, timeSum, setTimeSum,
    setStart, setWeatherLoc, setImages, setIsSave, setPloggingPath, resetPloggingPath }) => {
    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.container}>
            {!showPloggingEndPage &&
                <View style={styles.containerTitle}>
                    {!isPlogging &&
                        <TouchableOpacity onPress={navigation.goBack}>
                            <BackSvg width={20} height={20} fill={"#FFF"} style={[{ marginLeft: 10}, {marginTop: 2}]}></BackSvg>
                        </TouchableOpacity>
                    }
                    <Text style={styles.titleText}>플로깅</Text>
                </View>
            }
            {showPloggingEndPage &&
                <View style={styles.containerResultTitle}>
                    <Text style={styles.resultTitleText}>플로깅 결과</Text>
                </View>
            }
            {(!showPloggingEndPage) && <PloggingStatusBar distSum={distSum} isPlogging={isPlogging}
                setTimeSum={setTimeSum} timeSumString={timeSum} setIsSave={setIsSave} resetPloggingPath={resetPloggingPath}
                setDistSum={setDistSum}></PloggingStatusBar>}
            <Plogging distSum={distSum} timeSumString={timeSum} setDistSum={setDistSum} isPlogging={isPlogging}
                showPloggingEndPage={showPloggingEndPage} setTimeSum={setTimeSum} resetPloggingPath={resetPloggingPath}
                setWeatherLoc={setWeatherLoc} setImages={setImages} setPloggingPath={setPloggingPath} setIsSave={setIsSave}
                handleShowEndPage={handleShowEndPage} saveLogs={saveLogs}></Plogging>
            <PloggingStartEndButton isPlogging={isPlogging} handleIsPlogging={handleIsPlogging}
                showPloggingEndPage={showPloggingEndPage} handleShowEndPage={handleShowEndPage}
                setStart={setStart} setIsSave={setIsSave}></PloggingStartEndButton>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    containerTitle: {
        backgroundColor: "white",
        alignItems: 'center',
        borderBottomWidth: 0.3,
        flexDirection: "row",
        height: '8%',
        zIndex: 1002,
    },
    titleText: {
        fontSize: 20,
        marginLeft: 40,
        position: "absolute",
        color: "#000"
    },
    containerResultTitle: {
        backgroundColor: "white",
        alignItems: 'center',
        borderBottomWidth: 0.3,
        flexDirection: "row",
        height: '8%',
        justifyContent: 'center',

    },
    resultTitleText: {
        fontSize: 20,
        alignItems: "center",
        justifyContent: 'center',
        color: "#000"
    }
})

export default App;