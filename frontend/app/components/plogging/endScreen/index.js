import React, { useEffect, useRef, useState, useCallback } from 'react';
import 'react-native-gesture-handler';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "../map/index";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import PloggingStatusBar from '../plogging-status-bar/index';
import { useSelector } from "react-redux"
import { launchImageLibrary } from 'react-native-image-picker';
import styled from "styled-components/native";
import ImageAppend from '../icons/imageAppend.svg'
import ImageDelete from '../icons/imageDelete.svg';



const EndPlogging = ({ ploggingPath, center }) => {
    const mapView = useRef(null);
    const [middle, setMiddle] = useState();
    const distSum = useSelector(state => state.distSum);
    const isPlogging = useSelector(state => state.isPlogging);
    const startTime = useSelector(state => state.startTime);
    const [endTime, setEndTime] = useState([]);
    const curr = new Date();
    const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + (KR_TIME_DIFF));
    const WEEKDAY = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    // const [elapsedTime, setElapsedTime] = useState("");
    const timeSum = useSelector(state => state.timeSum);
    const [imageSource, setImageSource] = useState([]);
    const nextId = useRef(1);

    const options = {
        title: 'Load Photo',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    useEffect(() => {

        if (ploggingPath[(ploggingPath.length / 2)] === undefined || ploggingPath.length < 2) {
            const { latitude, longitude } = center;
            setMiddle({
                ...middle,
                latitude,
                longitude,
            });
        } else {
            const { latitude, longitude } = ploggingPath[(ploggingPath.length / 2)];
            setMiddle({
                ...middle,
                latitude,
                longitude,
            });
        }
        const year = kr_curr.getFullYear();
        const month = ('0' + (kr_curr.getMonth() + 1)).slice(-2);
        const day = ('0' + kr_curr.getDate()).slice(-2);
        const dateString = year + '/' + month + '/' + day;

        const hours = ('0' + kr_curr.getHours()).slice(-2);
        const minutes = ('0' + kr_curr.getMinutes()).slice(-2);
        const timeString = hours + ':' + minutes;

        const week = WEEKDAY[kr_curr.getDay()];
        setEndTime([dateString, week, timeString, kr_curr]);

        // let TimeTaken = kr_curr.getTime() - startTime[3].getTime();

        // const hour = parseInt(TimeTaken / 1000 / 60 / 60);
        // TimeTaken = TimeTaken - (hour * 1000 * 60 * 60);
        // const min = parseInt(TimeTaken / 1000 / 60);
        // TimeTaken = TimeTaken - (min * 1000 * 60);
        // const sec = parseInt(TimeTaken / 1000);
        // let str = "총 ";
        // if (hour > 0)
        //     str += hour + "시간 "
        // if (min > 0)
        //     str += min + "분 "
        // if (sec > 0)
        //     str += sec + "초 "
        // str += "플로깅을 했어요"

        // if (elapsedTime === "")
        //     setElapsedTime(str);
    }, []);

    const showCameraRoll = () => {
        launchImageLibrary(options, (response) => {
            if (response.error) {
                console.log('LaunchImageLibrary Error: ', response.error);
            }
            else {
                if (!response.didCancel) {
                    const newImg = {
                        id: nextId.current,
                        uri: response.assets[0].uri
                    }
                    setImageSource(imageSource => [newImg, ...imageSource]);
                    console.log(nextId.current)
                    nextId.current += 1;
                }
            }
        });
    };

    const deleteImg = (id) => {
        // console.log(id)
        setImageSource(imageSource.filter(img => img.id !== id));
    }

    return (<>
        {middle &&
            <View
                style={style.container}
            >
                <View style={style.containerTitle}>
                    <Text style={style.titleText}>플로깅 결과</Text>
                </View>
                <View style={style.containerTime} >
                    <View style={style.innerContainerTime} >
                        <Text style={style.date}>{startTime[0]}{startTime[1]}</Text>
                        <Text style={style.timeStart}>{startTime[2]} ~ {endTime[2]}</Text>
                    </View>
                </View>
                <View style={style.containerMap} >
                    <NaverMapView ref={mapView}
                        style={style.container}
                        center={{ ...middle, zoom: 16 }}
                        useTextureView>
                        {ploggingPath.length >= 2 &&
                            <Path coordinates={ploggingPath} onClick={() => console.log('onClick! path')} width={5} color={'blue'} />
                        }
                    </NaverMapView>
                </View>
                <View style={style.containerState} >
                    <PloggingStatusBar distSum={distSum} isPlogging={isPlogging} timeSumString={timeSum}></PloggingStatusBar>
                </View>
                <Text style={{ marginLeft: 10, color: "grey" }}>최대 9개 업로드 가능</Text>
                <ScrollView horizontal={true} style={style.containerPicture} >
                    {imageSource.length < 9 &&
                        <ImageAppendButton>
                            <ImageAppend onPress={showCameraRoll}>
                                <Label>Show Camera Roll</Label>
                            </ImageAppend>
                        </ImageAppendButton>
                    }
                    {
                        imageSource.map((img, i) => (
                            <View>
                                <Photo source={{ uri: img.uri }} key="{i}" />
                                <TouchableOpacity onPress={() => deleteImg(img.id)} hitSlop={{ right: 12, bottom: -90, left: -90, top: 120 }}>
                                    <ImageDelete width={20} height={20} style={style.delBtn} />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        }
    </>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: "column",
        height: "100%",
        backgroundColor: "white",
    },
    containerTitle: {
        flex: 0.3,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",

    },
    containerTime: {
        flex: 0.3,
        backgroundColor: "white",
        flexDirection: 'column',
        borderTopWidth: 0.3,
    },
    innerContainerTime: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        marginLeft: 15,
    },
    date: {
        fontSize: 15,
        color: 'black',
        fontWeight: "500"
    },
    timeStart: {
        fontSize: 12,
        color: "#ABABAB",
    },

    containerMap: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    containerState: {
        height: 77,
        borderBottomWidth: 5,
        borderColor: "#DDDDDD",
        marginBottom: 10,

    },
    containerPicture: {
        flex: 0.4,
    },
    containerBtn: {
        flex: 0.3,
        backgroundColor: "white"
    },
    delBtn: {
        position: "relative",
        top: -105,
        left: 100,
    }
})

const ImageAppendButton = styled.View`
    margin-top: 10px;
    margin-left: 10px; 
    width: 110px;
    height: 110px;
    background-color: #C4C4C4;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
`;

const Label = styled.Text``;

const Photo = styled.Image`
    margin-top: 10px;
    margin-left: 10px; 
    width: 110px;
    height: 110px;
    background-color: #C4C4C4;
    border-radius: 4px;
`;

export default EndPlogging;
