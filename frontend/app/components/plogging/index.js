import React, { useEffect, useRef, useState, useCallback } from 'react';
import 'react-native-gesture-handler';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "./map";
import { ImageBackground, PermissionsAndroid, Platform, ScrollView, Text, Alert, Linking, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { LayerGroup } from './map/index';
import { useSelector } from "react-redux"
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import axiosInstance from "../../../utils/API";
import haversine from 'haversine';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import TrashcanInfo from './trashcan-modal/index';
import EndPlogging from './endScreen/index';
import dfs_xy_conv from '../../../utils/IHateMeteorologicalAgency';
import PlomeetSpinner from '../../../utils/PlomeetSpinner';
import AsyncStorage from '@react-native-community/async-storage';
import RNExitApp from 'react-native-exit-app';
import SendIntentAndroid from 'react-native-send-intent'

//테스트용으로 남겨둔 데이터 삭제 X
const P0 = { latitude: 37.564362, longitude: 126.977011 };
const P1 = { latitude: 37.565051, longitude: 126.978567 };
const P2 = { latitude: 37.565383, longitude: 126.976292 };
const P4 = { latitude: 37.564834, longitude: 126.977218 };
const P5 = { latitude: 37.562834, longitude: 126.976218 };

const Plogging = ({ distSum, timeSumString, setDistSum, setTimeSum, isPlogging, setIsSave, showPloggingEndPage, setWeatherLoc, setImages, resetPloggingPath, setPloggingPath, handleShowEndPage, saveLogs }) => {
    const mapView = useRef(null);
    const [location, setLocation] = useState({ latitude: 37.564362, longitude: 126.977011 });
    // const [location, setLocation] = useState({ latitude: 37.33117775, longitude: -122.03072292 }); //ios 테스트용 - 지우지마세여 ㅠㅠㅠ 넹!!
    //const [ploggingPath, setPloggingPath] = useState([]);
    //const [enableLayerGroup, setEnableLayerGroup] = useState(true);
    const [center, setCenter] = useState();
    const [trashcanList, setTrashcanList] = useState([]);
    const [showTrashcans, setShowTrashcans] = useState(false);
    const [prevLocation, setPrevLocation] = useState();
    // const [prevLocation, setPrevLocation] = useState({ latitude: 37.33117775, longitude: -122.03072292 }); ////ios 테스트용  - 지우지마세여 ㅠㅠㅠ  넹!!
    const [totalDist, setTotalDist] = useState(0);
    const [showThisNum, setShowThisNum] = useState(-2);
    const [showInfoDetail, setShowInfoDetail] = useState(false);
    const [trashInfoDetail, setTrashInfoDetail] = useState();
    const ploggingPath = useSelector(state => state.ploggingPath);
    const navigation = useNavigation();
    const fineLoc = useSelector(state => state.fineLoc);
    // const backgroundLoc = useSelector(state => state.backgroundLoc);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            if(!fineLoc) { //허용이 없으면 돌아가기
                if (Platform.OS === 'ios') {
                    //혜민's to do
                }
                else if (Platform.OS === 'android'){
                    navigation.navigate('홈');
                    Alert.alert(
                        "",
                        "위치 권한을 허용하지 않으면 플로깅 기능을 사용할 수 없어요.\n위치 권한을 항상 허용해주세요",[
                        {text:"확인",onPress:()=>Linking.openSettings()},
                        ]
                    );
                    
                }
            }else {//백그라운드만 허용 안했을때나 둘다 허용했을때
                if (Platform.OS === 'ios') {
                    //혜민's to do
                    //일단 앱 사용시 위치 권한 허용시 앱 사용은 가능하게 하되
                    //항상 허용상태가 아니면 alert로 설명하고 다시 설정 창으로 유도했음
                    //그 후에도 허용을 안했다면 그냥 이용하게 냅둠
                    // getRealTimeLoc();
                    // watchingLoc();
                }
                else if (Platform.OS === 'android'){
                    requestLocationPermission();
                }
            }
         }
    }, [isFocused]);


    //플로깅 저장 안하고 돌아왔을 때 처리에 필요
    useEffect(() => {
        setTotalDist(0);
        setPrevLocation({})
        return () => { }
    }, [isPlogging, showPloggingEndPage])

    useEffect(() => {
        AsyncStorage.removeItem("startedTime");
    }, [])

    //시작시 쓰레기통 전부를 가져온다.
    useEffect(() => {
        async function getTrashCans() {
            try {
                await axiosInstance.get("/trashcans")
                    .then((response) => {
                        if (response.status === 200) {
                            setTrashcanList(response.data.data);
                            console.log("get Trashcans SUCCESS");
                        } else {
                            console.log("get Trashcans FAIL");
                        }
                    })
                    .catch((response) => { console.log(response); });
            } catch (err) { console.log(err); }
        };
        getTrashCans();
    }, []);


    // 위치가 갱신되면 플로깅 이동 기록 쌓자
    useEffect(() => {
        if (isPlogging) { //이동 거리 계산
            //setPloggingPath(ploggingPath => [...ploggingPath, location]);
            setPloggingPath(location);
            if (prevLocation) {
                setTotalDist(() => {
                    const prevLatLng = {
                        lat: prevLocation.latitude,
                        lng: prevLocation.longitude
                    }
                    const curLatLng = {
                        lat: location.latitude,
                        lng: location.longitude
                    }
                    const options = {
                        format: '{lat,lng}',
                        unit: 'km'
                    }

                    return (totalDist + haversine(prevLatLng, curLatLng, options)) || 0;
                })
            }

            setPrevLocation(location);
            // console.log(ploggingPath);
            setDistSum(totalDist.toFixed(2));
        }
    }, [location]);

    useEffect(() => {
        if (trashcanList.length > 0) {
            setShowTrashcans(true);
        }
    }, [trashcanList]);

    useEffect(() => {
        if (showThisNum === -1) {
            setShowInfoDetail(false);
            return;
        }

        if (showThisNum >= 0) {
            setShowInfoDetail(true);
            const { latitude, longitude } = trashcanList[showThisNum];
            setCenter({ //마커 클릭하면 해당마커를 지도 중앙으로
                ...center,
                latitude,
                longitude,
            });
            const { cityName, detailAddr, streetName, location, trashCanType } = trashcanList[showThisNum];
            setTrashInfoDetail({
                ...trashInfoDetail,
                cityName, detailAddr, streetName, location, trashCanType
            })
        }
        //인덱스 맵핑으로 처리했음 그 키값이 곧 해당 value 인덱스이다. 데이터가 커질꺼 같아서 시간 줄이려고.. 안전하진 않음

    }, [showThisNum]);

    const watchingLoc = () => {
        const _watchId = Geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;

                setLocation({
                    ...location,
                    latitude,
                    longitude,
                });
            },
            error => {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 0,
                interval: 3000,
                fastestInterval: 2000,
            },
        );

        return () => {
            if (_watchId) {
                Geolocation.clearWatch(_watchId);
            }
        };
    }

    //렌더링 시 실행해서 현재 위치 및 주요 state들 셋팅
    const getRealTimeLoc = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                //setPloggingPath([]);
                setLocation({
                    ...location,
                    latitude,
                    longitude,
                });
                setCenter({
                    ...center,
                    latitude,
                    longitude,
                });
                const rs = dfs_xy_conv("toXY", latitude, longitude);
                console.log("기상청 전용 좌표 : " + rs.x, rs.y);
                setWeatherLoc([rs.x, rs.y]);
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    //내위치를 가운데로
    const setMyLocToCenter = () => {
        const { latitude, longitude } = location;
        if (latitude === center.latitude && longitude === center.longitude) {  //같은 경우에 강제 리렌더링 시켜야한다.
            forceRendering();
            return;
        }
        setCenter({
            ...center,
            latitude,
            longitude,
        });
    }

    //강제로 좌표 살짝 바꾸서 리렌더링을 강요
    const forceRendering = () => {
        const { latitude, longitude } = location;
        const upLat = latitude + 0.000001;
        const upLon = longitude + 0.000001;
        setCenter({ ...center, upLat, upLon });
        setTimeout(() => recoverLoc(), 1000);
    }

    //강제로 변경 좌표 복구
    const recoverLoc = () => {
        const { latitude, longitude } = location;
        setCenter({
            ...center,
            latitude,
            longitude,
        });
    }
    
    async function requestLocationPermission() { // 승인 안했을때나 에러 났을때의 처리는 나중에..
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: '위치 권한',
                    message: '플로깅 중 위치정보 활용에 동의합니다.',
                    buttonNeutral: '나중에',
                    buttonNegative: '거부',
                    buttonPositive: '승인',
                },
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the location');
                requestBackGroundLocationPermission();
                getRealTimeLoc();
                watchingLoc();
                return true;
            } else {
                console.log('FINE Location permission denied');
                RNExitApp.exitApp();
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    }

    async function requestBackGroundLocationPermission() { 
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
                {
                    title: '위치 권한',
                    message: '앱 위치정보를 항상 허용해주세요!',
                    buttonNeutral: '나중에',
                    buttonNegative: '거부',
                    buttonPositive: '승인',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the location in background');
                return true;
            } else {
                console.log('BackGround Location permission denied');
                Alert.alert(
                    "",
                    "위치 권한 항상 허용하지 않으면 다른 앱 사용 시 플로깅 기록이 정확하지 않아요.\n위치 권한을 항상 허용해주세요",[
                      {text:"확인",onPress:()=>Linking.openSettings()},
                      //SendIntentAndroid.openSettings("android.settings.LOCATION_SOURCE_SETTINGS")
                  ]
                  )
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    }

    //주석이 많은데 나중에 다 정리함,, 차후 수정시 참고하려고 남겨둠
    return <>
        {
            !showPloggingEndPage ?
                <>
                    {trashInfoDetail &&
                        <TrashcanInfo showInfoDetail={showInfoDetail} setShowInfoDetail={setShowInfoDetail} setShowThisNum={setShowThisNum} trashInfoDetail={trashInfoDetail} />
                    }
                    {center &&
                        <NaverMapView ref={mapView}
                            style={style.container}
                            center={{ ...center, zoom: 16 }}
                            // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                            // onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                            // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
                            // onMapClick={() => { setShowInfoDetail(false); setShowThisNum(-1) }}
                            useTextureView>
                            <Marker
                                coordinate={location}
                                width={45}
                                height={45}
                                onClick={() => {
                                    console.log('onClick! myLoc')
                                    // mapView.current.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BICYCLE, enableLayerGroup);
                                    // mapView.current.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_TRANSIT, enableLayerGroup);
                                    // setEnableLayerGroup(!enableLayerGroup)
                                }}
                                image={{ uri: "https://i.postimg.cc/sgn2NM4r/image.png" }}
                            />


                            {ploggingPath.length >= 2 &&
                                <Path coordinates={ploggingPath} onClick={() => console.log('onClick! path')} width={6} outlineWidth={0} color={'#0F58F9'} />
                            }

                            {/* 쓰레기통 마커 다 띄우기 */}
                            {showTrashcans &&
                                trashcanList.map(item => {
                                    return (
                                        <Marker
                                            key={item.trashcanId}
                                            coordinate={{ latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude) }}
                                            image={showThisNum === (parseInt(item.trashcanId) - 1) ?
                                                { uri: "https://i.postimg.cc/TKTKSWWg/clicked-Maker.png" } : { uri: "https://i.postimg.cc/k2w2dXxZ/un-Clicked-Marker.png" }}
                                            width={25}
                                            height={25}
                                            onClick={() => setShowThisNum(parseInt(item.trashcanId) - 1)}
                                        />
                                    );
                                })
                            }


                        </NaverMapView>
                    }
                    {center ?
                        <TouchableOpacity style={{ position: 'absolute', bottom: '75%', right: 8 }} onPress={() => setMyLocToCenter()}>
                            <View style={style.compassBackGround}>
                                <IconMaterialIcons name="gps-fixed" size={30} color="#303644" />
                            </View>
                        </TouchableOpacity>

                        :

                        <PlomeetSpinner isVisible={true} size={50} />

                    }
                    {/*<TouchableOpacity style={{ position: 'absolute', bottom: '10%', right: 8 }} onPress={() => navigation.navigate('stack')}>
            <View style={{ backgroundColor: 'gray', padding: 4 }}>
                <Text style={{ color: 'white' }}>open stack</Text>
            </View>
        </TouchableOpacity>
        <Text style={{ position: 'absolute', top: '95%', width: '100%', textAlign: 'center' }}>Icon made by Pixel perfect from www.flaticon.com</Text>
        */}
                </>
                :
                <EndPlogging ploggingPath={ploggingPath} center={center} setImages={setImages} distSum={distSum} isPlogging={isPlogging} setTimeSum={setTimeSum} timeSumString={timeSumString} setIsSave={setIsSave} resetPloggingPath={resetPloggingPath} setDistSum={setDistSum} handleShowEndPage={handleShowEndPage} saveLogs={saveLogs} />
        }
    </>
};

const style = StyleSheet.create({
    container: { width: '100%', height: '100%' },
    realLocBtn: { position: 'absolute', bottom: 100, right: 10, alignSelf: 'flex-end' },
    compassBackGround: {
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 9,
        backgroundColor: "#FFFFFF",
        elevation: 5,
        borderWidth: 1,

    },
    icon: {
        width: 20,
        height: 20,
    },
    myLoc: {
        width: 35,
        height: 37,
    }
});



export default Plogging;