import React, { useEffect, useRef, useState, Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "../../plogging/map/index";
import { ScrollView, StyleSheet, Text, View, Photo } from "react-native";
import { useNavigation } from '@react-navigation/native';
import PloggingStatusBar from '../../plogging/plogging-status-bar/index';
import DetailPhotos from './detailPhotos';

const LogDetail = ({route}) => {
    const mapView = useRef(null);
    const [middle, setMiddle] = useState({ latitude: 37.564362, longitude: 126.977011 });
    const { userId } = route.params;
    const { plogId } = route.params;

    const headerComponent = (
        <View>
            <View style={styles.containerTitle}>
                <Text style={styles.titleText}>X월 X번째 플로깅</Text>
                <View style={styles.innerContainerTime} >
                    <Text style={styles.date}>2022/05/11(수) </Text>
                    <Text style={styles.timeStart}>17:28 출발</Text>
                </View>
            </View>
            <View style={styles.containerMap} >
                <NaverMapView ref={mapView}
                    style={styles.containerMapIn}
                    center={{ ...middle, zoom: 16 }}
                    useTextureView>
                    {/* {ploggingPath.length >= 2 &&
                            <Path coordinates={ploggingPath} onClick={() => console.log('onClick! path')} width={5} color={'blue'} />
                        } */}
                </NaverMapView>
            </View>
            <View style={styles.containerState} >
                <PloggingStatusBar distSum={1.2} isPlogging={false} timeSumString={"01:01"}></PloggingStatusBar>
            </View>
        </View>
    )
    return (
        <DetailPhotos userId={userId} plogId={plogId} headerComponent={headerComponent}></DetailPhotos>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerTitle: {
        padding: 10,
        backgroundColor: "white",
        justifyContent: 'center',

    },
    titleText: {
        fontSize: 15,
        marginLeft: 20,
        fontWeight: "bold",
    },
    innerContainerTime: {
        flexDirection: 'row',
        marginTop: 7,
        marginLeft: 20,
        alignItems: 'center',

    },
    date: {
        fontSize: 12,
        color: 'black',
        fontWeight: "500"
    },
    timeStart: {
        fontSize: 12,
        color: "#ABABAB",
    },
    containerMap: {
        height: 250,
        paddingLeft: 10,
        paddingRight: 10
    },
    containerMapIn: {
        flexDirection: "column",
        height: "100%",
        backgroundColor: "white",
    },
    containerState: {
        borderBottomWidth: 5,
        borderColor: "#DDDDDD",
    },
});

export default LogDetail;