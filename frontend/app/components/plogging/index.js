import React, { useEffect, useRef, useState, useCallback } from 'react';
import 'react-native-gesture-handler';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "./map";
import { ImageBackground, PermissionsAndroid, Platform, ScrollView, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { LayerGroup } from './map/index';
import { useSelector } from "react-redux"
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import axiosInstance from "../../../utils/API";
import haversine from 'haversine';
import TrashcanInfo from './trashcan-modal/index';
import EndPlogging from './endScreen/index';
import dfs_xy_conv from '../../../utils/IHateMeteorologicalAgency'

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
    //화면에 렌더링되면 권한부터 살피자
    useEffect(() => {

        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization('whenInUse');
            getRealTimeLoc();
        }
        if (Platform.OS === 'android')
            if (requestLocationPermission())//권한 활용에 동의한 상태라면 처음 위치를 가져와서 지도 중심으로 잡는다. ios도 동일하게 해줘야한다
                getRealTimeLoc();           // 이거 안하면 사용자 입장에서 시작시 좌표 중심이 바로 바뀐다.
    }, []);

    //플로깅 저장 안하고 돌아왔을 때 처리에 필요
    useEffect(() => { 
        setTotalDist(0);
        setPrevLocation({})
    }, [isPlogging, showPloggingEndPage])

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

    // 일정 시간 간격으로 위치 감시해서 현재 위치 갱신하자
    useEffect(() => {
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
                return true;
            } else {
                console.log('Location permission denied');
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
                                width={39}
                                height={39}
                                onClick={() => {
                                    console.log('onClick! myLoc')
                                    // mapView.current.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BICYCLE, enableLayerGroup);
                                    // mapView.current.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_TRANSIT, enableLayerGroup);
                                    // setEnableLayerGroup(!enableLayerGroup)
                                }}
                                image={require("./icons/myLocMarker.png")}
                            />

                            {ploggingPath.length >= 2 &&
                                <Path coordinates={ploggingPath} onClick={() => console.log('onClick! path')} width={5} color={'blue'} />
                            }

                            {/* 쓰레기통 마커 다 띄우기 */}
                            {showTrashcans &&
                                trashcanList.map(item => {
                                    return (
                                        <Marker
                                            key={item.trashcanId}
                                            coordinate={{ latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude) }}
                                            image={showThisNum === (parseInt(item.trashcanId) - 1) ?
                                                require("./icons/clickedMaker.png") : require("./icons/unClickedMarker.png")}
                                            width={25}
                                            height={25}
                                            onClick={() => setShowThisNum(parseInt(item.trashcanId) - 1)}
                                        />
                                    );
                                })
                            }

                            {/* <Marker coordinate={P1} pinColor="blue" zIndex={1000} onClick={() => console.warn('onClick! p1')} />
                    <Marker coordinate={P2} pinColor="red" zIndex={100} alpha={0.5} onClick={() => console.warn('onClick! p2')} />
                    <Marker coordinate={P4} onClick={() => console.warn('onClick! p4')} image={require("../../../assets/imgs/marker.png")} width={48} height={48} /> 
                    <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')} />
                    <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')} />
                    <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')} />
                    <Marker coordinate={P5} onClick={() => console.warn('onClick! p0')} width={96} height={96}>
                        <View style={{ backgroundColor: 'rgba(255,0,0,0.2)', borderRadius: 80 }}>
                            <View style={{ backgroundColor: 'rgba(0,0,255,0.3)', borderWidth: 2, borderColor: 'black', flexDirection: 'row' }}>
                                <Image source={require("../../../assets/imgs/marker.png")} style={{
                                    width: 32, height: 32,
                                    backgroundColor: 'rgba(0,0,0,0.2)', resizeMode: 'stretch',
                                    borderWidth: 2, borderColor: 'black'
                                }} fadeDuration={0} />
                                <Text>Image</Text>
                            </View>
                            <ImageBackground source={require("../../../assets/imgs/marker.png")} style={{ width: 64, height: 64 }}>
                                <Text>image background</Text>
                            </ImageBackground>
                        </View>
                    </Marker>
                */}
                        </NaverMapView>
                    }
                    {center &&
                        <TouchableOpacity style={{ position: 'absolute', bottom: '75%', right: 8 }} onPress={() => setMyLocToCenter()}>
                            <View style={style.compassBackGround}>
                                <IconMaterialIcons name="gps-fixed" size={30} color="#303644" />
                            </View>
                        </TouchableOpacity>

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
