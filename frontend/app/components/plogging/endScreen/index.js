import React, { useEffect, useRef, useState, useCallback } from 'react';
import 'react-native-gesture-handler';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "../map/index";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import PloggingStatusBar from '../plogging-status-bar/index';
import { useSelector } from "react-redux"
import {launchImageLibrary} from 'react-native-image-picker';
import styled from "styled-components/native";
import ImageAppend from '../icons/imageAppend.svg'
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageDelete from '../icons/imageDelete.svg';



const EndPlogging = ({ ploggingPath, center }) => {
    const mapView = useRef(null);
    const [middle, setMiddle] = useState();
    const distSum = useSelector(state => state.distSum);
    const isPlogging = useSelector(state => state.isPlogging);
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
        <SafeAreaView>
        {middle &&
            <View
                style={style.container} 
            >
                <View style={style.containerTime} >
                    <Text>시간 영역</Text>
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
                    <Text style={{ marginLeft: 10,  color: "grey"}}>최대 9개 업로드 가능</Text>
                    <ScrollView horizontal={true} style={style.containerPicture} >
                        { imageSource.length < 9 &&
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
                                            <ImageDelete style={style.delBtn} />
                                        </TouchableOpacity>
                                </View>
                            ))
                            }
                    </ScrollView>
                </View>
            }
        </SafeAreaView>
    </>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: "column",
        height: "100%",
        backgroundColor: "white",
        padding: 10
    },
    containerTime: {
        flex: 0.3,
        backgroundColor: "blue"
    },
    containerMap: {
        flex: 1, backgroundColor: "purple"
    },
    containerState: {
        marginTop: 5,
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
        top: -110,
        left: 110,
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